import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SocketContext } from "../../navigators/StackNavigator";
import { useContext } from "react";
import { SQLiteProvider } from "expo-sqlite";
const Chat = () => {
  const insets = useSafeAreaInsets();

  const socket = useContext(SocketContext);
  console.log(socket);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <SQLiteProvider databaseName="chatapp.db">
        
      </SQLiteProvider>
    </SafeAreaView>
  );
};
export default Chat;
const styles = StyleSheet.create({});
