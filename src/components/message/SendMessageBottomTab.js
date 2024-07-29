import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
const SendMessageBottomTab = ({ SendMessage, message, setMessage }) => {
  return (
    <View
      style={{
        height: HEIGHT * 0.08,
      }}
    >
      <View
        style={{
          width: WIDTH * 0.98,
          backgroundColor: "rgba(10,50,120,0.8)",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: HEIGHT * 0.06,
          borderRadius: 7,
        }}
      >
        <TextInput
          style={{
            width: WIDTH * 0.9,
            height: HEIGHT * 0.03,
            paddingLeft: 7,
            color: "white",
          }}
          placeholderTextColor={"gray"}
          placeholder="message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <View
          style={{
            width: WIDTH * 0.08,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => SendMessage()}>
            <Ionicons name="send-outline" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default SendMessageBottomTab;
const styles = StyleSheet.create({});
