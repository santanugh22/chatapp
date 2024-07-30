import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useEffect, useRef } from "react";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

const MessageContainer = ({ messages, user_id }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
        keyExtractor={(item) => item.message_id.toString()}
        ref={ref}
        onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}
      />
    </View>
  );
};

export default MessageContainer;

const styles = StyleSheet.create({});
