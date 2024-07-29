import { StyleSheet, Text, View, Dimensions } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const SentMessage = ({ message }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.messageContent}>{message.message_content}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timestampText}>
          {new Date(message.sent_at).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};
export default SentMessage;
const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: WIDTH * 0.6,
    backgroundColor: "gray",
    borderRadius: 7,
    padding: 6,
    left: WIDTH * 0.4,
    marginTop: 4,
  },
  timeContainer: {
    padding: 2,
  },
  timestampText: {
    color: "white",
  },
  messageContent: {
    color: "white",
  },
});
