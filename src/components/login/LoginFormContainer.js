import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const LoginFormContainer = ({ email, setEmail, password, setPassword }) => {
  const [view, setView] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainForm}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" style={styles.input} />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={view}
          />
          <Text>
            {view ? (
              <TouchableHighlight onPress={() => setView(!view)}>
                <Feather name="eye-off" size={24} color="white" />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight onPress={() => setView(!view)}>
                <Feather name="eye" size={24} color="white" />
              </TouchableHighlight>
            )}
          </Text>
        </View>

        <View>
          <Pressable>
            <View>
              <Text>Login</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default LoginFormContainer;
const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT * 0.5,
    width: WIDTH * 0.98,
  },
  input: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.88,
    backgroundColor: "gray",
    paddingLeft: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: WIDTH * 0.95,
    alignSelf: "center",
  },
  inputContainer: {
    height: HEIGHT * 0.05,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: WIDTH * 0.95,
    alignSelf: "center",
  },
  mainForm: {
    gap: 2,
  },
});
