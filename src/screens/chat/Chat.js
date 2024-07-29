import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Friends from "../../components/modals/friends";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocketContext from "../../utils/SocketContext";
import { useContext, useEffect, useState, useCallback } from "react";
import * as SQLite from "expo-sqlite/next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HeaderComponent from "../../components/chat/HeaderComponent";
import ChatItems from "../../components/chat/ChatItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import debounce from "lodash.debounce";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [userid, setuserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [showfriend, setShowFriend] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [db, setDb] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user_id = await AsyncStorage.getItem("user_id");
        setuserId(user_id);
        const usern = await AsyncStorage.getItem("username");
        setUsername(usern);
        const db = await SQLite.openDatabaseAsync("chatapp.db");
        setDb(db);
        console.log("database opened");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          if (db) {
            const chats = await db.getAllAsync(
              `SELECT m1.received_by, m1.message_receiver_username, m1.message_content
               FROM messages m1
               JOIN (
                   SELECT received_by, MAX(sent_at) as latest_sent_at
                   FROM messages
                   GROUP BY received_by
               ) m2
               ON m1.received_by = m2.received_by AND m1.sent_at = m2.latest_sent_at
               ORDER BY m1.sent_at DESC;`
            );

            console.log(await db.getAllAsync("SELECT * FROM messages;"));
            setChats(chats);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, [db])
  );

  const handleNewMessage = useCallback(
    debounce(async (message) => {
      console.log("message received", message);
      try {
        if (db && message.sent_by !== message.received_by) {
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
              message.message_id,
              message.sent_by,
              message.message_content,
              message.sent_at,
              message.received_by,
              message.message_status,
              message.message_receiver_username,
              message.sender_username,
            ]
          );
        }
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [db]
  );

  const handleUndeliveredMessages = useCallback(
    debounce(async (data) => {
      try {
        if (db) {
          for (let i = 0; i < data.length; i++) {
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
                data[i].message_id,
                data[i].sent_by,
                data[i].message_content,
                data[i].sent_at,
                data[i].received_by,
                data[i].message_status,
                data[i].message_receiver_username,
                data[i].sender_username,
              ]
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 300),
    [db]
  );

  useEffect(() => {
    if (db) {
      socket.on("message", handleNewMessage);
      socket.on("undelivered", handleUndeliveredMessages);
      socket.emit("receive_undelivered");

      return () => {
        socket.off("message", handleNewMessage);
        socket.off("undelivered", handleUndeliveredMessages);
      };
    }
  }, [db, handleNewMessage, handleUndeliveredMessages, socket]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <HeaderComponent showfriend={showfriend} setShowFriend={setShowFriend} />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("MESSAGE", {
                receiver_id: item.received_by,
                receiver_username: item.message_receiver_username,
                user_id: userid,
                username: username,
              })
            }
          >
            <ChatItems item={item} />
          </Pressable>
        )}
      />
      <Friends visible={showfriend} setVisible={setShowFriend} />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
