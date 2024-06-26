import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const MessagingPage = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      
    </SafeAreaView>
  );
};
export default MessagingPage;
const styles = StyleSheet.create({});
