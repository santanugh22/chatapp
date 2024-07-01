import { StyleSheet, Text, View, Dimensions } from "react-native";

const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const ReceivedMessage = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.messageContent}>This is the received message</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timestampText}>12:00PM</Text>
      </View>
    </View>
  );
};
export default ReceivedMessage;
const styles = StyleSheet.create({
  mainContainer: {
    maxWidth: WIDTH * 0.6,
    backgroundColor:"gray",
    borderRadius:7,
    padding:6
  },
  timeContainer: {
    padding: 2,
  },
  timestampText: {
    color: "white",
  },
  messageContent:{
    color:"white"
  }
});
