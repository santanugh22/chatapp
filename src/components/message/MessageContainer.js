import { StyleSheet, Text, View, Dimensions } from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const MessageContainer = () => {
  return (
    <View
      style={{
        height: HEIGHT * 0.7,
        width: WIDTH,
      }}
    >
      <ReceivedMessage />
      <SentMessage/>
    </View>
  );
};
export default MessageContainer;
const styles = StyleSheet.create({});
