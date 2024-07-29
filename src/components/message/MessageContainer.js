import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const MessageContainer = ({ messages, user_id }) => {
  return (
    <View
      style={{
        height: HEIGHT * 0.7,
        width: WIDTH,
      }}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => {
          if (item.sent_by === user_id) {
            return <SentMessage message={item} />;
          } else {
            return <ReceivedMessage message={item} />;
          }
        }}
      />
    </View>
  );
};
export default MessageContainer;
const styles = StyleSheet.create({});
