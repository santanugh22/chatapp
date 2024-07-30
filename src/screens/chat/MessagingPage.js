import {
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite/next";
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { randomUUID } from "expo-crypto";
import SocketContext from "../../utils/SocketContext";
import HeaderComponent from "../../components/message/HeaderComponent";
import MessageContainer from "../../components/message/MessageContainer";
import SendMessageBottomTab from "../../components/message/SendMessageBottomTab";
import { useRoute } from "@react-navigation/native";
import debounce from "lodash.debounce";

const MessagingPage = () => {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [db, setDb] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const socket = useContext(SocketContext);

  const ref = useRef(null);

  const SendMessage = async () => {
    const messageObj = {
      message_id: randomUUID(),
      sent_by: route.params.user_id,
      message_content: message,
      sent_at: new Date().toISOString(),
      received_by: route.params.receiver_id,
      message_status: 0,
      message_receiver_username: route.params.receiver_username,
      sender_username: route.params.username,
    };
    try {
      socket.emit("message", messageObj);
      setMessageData((prevData) => [...prevData, messageObj]);
      setMessage("");
      await db.runAsync(
        `
        INSERT INTO messages (
          message_id,
          sent_by,
          message_content,
          sent_at,
          received_by,
          message_status,
          message_receiver_username,
          sender_username
        ) VALUES (?,?,?,?,?,?,?,?)
      `,
        [
          messageObj.message_id,
          messageObj.sent_by,
          messageObj.message_content,
          messageObj.sent_at,
          messageObj.received_by,
          messageObj.message_status,
          messageObj.message_receiver_username,
          messageObj.sender_username,
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewMessage = useCallback(
    debounce(async (data) => {
      try {
        if (data.received_by === route.params.user_id) {
          setMessageData((prevData) => [...prevData, data]);
        }
        await db.runAsync(
          `INSERT INTO messages(
            message_id,
            sent_by,
            message_content,
            sent_at,
            received_by,
            message_status,
            message_receiver_username,
            sender_username
          ) VALUES(?,?,?,?,?,?,?,?)`,
          [
            data.message_id,
            data.sent_by,
            data.message_content,
            data.sent_at,
            data.received_by,
            data.message_status,
            data.message_receiver_username,
            data.sender_username,
          ]
        );
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [db, route.params.user_id]
  );

  useEffect(() => {
    (async () => {
      try {
        const db = await SQLite.openDatabaseAsync("chatapp.db");
        setDb(db);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (db) {
          const messages = await db.getAllAsync(
            `SELECT * FROM messages WHERE (sent_by=? AND received_by=?) OR (sent_by=? AND received_by=?)`,
            [
              route.params.user_id,
              route.params.receiver_id,
              route.params.receiver_id,
              route.params.user_id,
            ]
          );

          setMessageData(messages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [db, route.params.user_id, route.params.receiver_id]);

  useEffect(() => {
    if (db) {
      socket.on("message", handleNewMessage);
      return () => {
        socket.off("message", handleNewMessage);
      };
    }
  }, [db, handleNewMessage, socket]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <HeaderComponent />
      <MessageContainer messages={messageData} user_id={route.params.user_id} ref={ref}/>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
        <SendMessageBottomTab
          SendMessage={SendMessage}
          message={message}
          setMessage={setMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagingPage;

const styles = StyleSheet.create({});
