import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocketContext from "../../utils/SocketContext";
import { useContext } from "react";
import { SQLiteProvider,useSQLiteContext } from "expo-sqlite/next";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../components/chat/HeaderComponent";
import ChatItems from "../../components/chat/ChatItems";
const Chat = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const socket = useContext(SocketContext);
  console.log(socket);
  const data = [0, 0, 0, 0, 0, 0];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <HeaderComponent />
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
    </SafeAreaView>
  );
};
export default Chat;
const styles = StyleSheet.create({});
