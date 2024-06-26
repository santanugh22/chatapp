import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Chat = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    ></SafeAreaView>
  );
};
export default Chat;
const styles = StyleSheet.create({});
