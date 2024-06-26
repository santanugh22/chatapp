import { StyleSheet, Text, View, Dimensions } from "react-native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const LoginHeader = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>ChatApp</Text>
    </View>
  );
};
export default LoginHeader;
const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT * 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#e11d48",
    fontWeight: "900",
  },
});
