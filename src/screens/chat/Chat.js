import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite/next";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocketContext from "../../utils/SocketContext";
import { useContext, useEffect, useState } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";
import useSocket from "../../hooks/useSocket";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../components/chat/HeaderComponent";
import ChatItems from "../../components/chat/ChatItems";
import CreateNewChatModal from "../../modals/CreateNewChatModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Chat = () => {
  const [shownewchat, setShowNewChat] = useState(false);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [database, setDatabase] = useState(null);

  const [chats, setChats] = useState([]);

  async function LoadChats() {
    try {
      const rows = await database.getAllAsync(
        "SELECT receiver_username FROM messages "
      );
      setChats(rows);
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  }

  const data = [0, 0, 0];

  // const { socket, error, connected } = useSocket(
  //   "https://chatappbackend-vfg8.onrender.com",
  //   token
  // );

  useEffect(() => {
    (async () => {
      // const token = await AsyncStorage.getItem("token");
      // setToken(token);
      const db = await SQLite.openDatabaseAsync("chatapp.db");

      setDatabase(db);
    })();
    LoadChats();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <HeaderComponent />
      {chats?.length ? (
        <SQLiteProvider databaseName="chatapp.db">
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => navigation.navigate("MESSAGE")}>
                  <ChatItems />
                </Pressable>
              );
            }}
          />
        </SQLiteProvider>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            No chats
          </Text>
        </View>
      )}

      <Pressable onPress={() => setShowNewChat(true)}>
        <View
          style={{
            height: 90,
            width: 90,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 45,
            position: "absolute",
            bottom: 80,
            left: 300,
          }}
        >
          <AntDesign name="plus" size={30} color="black" />
        </View>
      </Pressable>
      <CreateNewChatModal visible={shownewchat} setVisible={setShowNewChat} />
    </SafeAreaView>
  );
};
export default Chat;
const styles = StyleSheet.create({});
