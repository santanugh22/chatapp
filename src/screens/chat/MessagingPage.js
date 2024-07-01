import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderComponent from "../../components/message/HeaderComponent";
import MessageContainer from "../../components/message/MessageContainer";
import SendMessageBottomTab from "../../components/message/SendMessageBottomTab";
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
      <HeaderComponent />
      <MessageContainer />
      <KeyboardAvoidingView behavior="padding">
        <SendMessageBottomTab />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MessagingPage;
const styles = StyleSheet.create({});
