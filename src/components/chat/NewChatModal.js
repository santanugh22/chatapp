import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const NewChatModal = ({ visible = false, setVisible }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);
  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} transparent>
      <BlurView
        style={{
          ...StyleSheet.absoluteFill,
        }}
        intensity={100}
      >
        <View
          style={{
            paddingTop: HEIGHT * 0.2,
            alignContent: "center",
          }}
        >
          <View style={styles.mainContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Text style={styles.headerText}>Start chatting !</Text>
              <Pressable onPress={() => setVisible(false)}>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Close
                </Text>
              </Pressable>
            </View>
            <View>
              <TextInput
                style={{ height: 50, width: 180, backgroundColor: "white" }}
                placeholder="Friends username"
                ref={ref}
              />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};
export default NewChatModal;
const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT * 0.4,
    width: WIDTH * 0.95,
    backgroundColor: "black",
    borderRadius: 7,
    alignSelf: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
});
