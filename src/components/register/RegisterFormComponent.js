import { useEffect, useRef, useState } from "react";
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
const RegisterFormComponent = ({ email, setEmail, password, setPassword }) => {
  const [view, setView] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainForm}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Username" style={styles.input} ref={ref} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" style={styles.input} ref={ref} />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={view}
          />

          {view ? (
            <TouchableHighlight
              onPress={() => setView(!view)}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Feather name="eye-off" size={24} color="#be185d" />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              onPress={() => setView(!view)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="eye" size={24} color="#be185d" />
            </TouchableHighlight>
          )}
        </View>

        <View style={styles.loginButtonContainer}>
          <Pressable>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Register</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default RegisterFormComponent;
const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT * 0.3,
    width: WIDTH * 0.98,
  },
  input: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.85,
    backgroundColor: "#fce7f3",
    paddingLeft: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fce7f3",
    width: WIDTH * 0.95,
    alignSelf: "center",
    height: HEIGHT * 0.065,
    borderRadius: 7,
    overflow: "hidden",
  },
  inputContainer: {
    height: HEIGHT * 0.065,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fce7f3",
    width: WIDTH * 0.95,
    alignSelf: "center",
    borderRadius: 7,
    overflow: "hidden",
  },
  mainForm: {
    gap: 2,
  },
  loginButton: {
    height: HEIGHT * 0.06,
    width: WIDTH * 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#db2777",
    alignSelf: "center",
    borderRadius: 7,
  },
  loginButtonContainer: {
    marginTop: 14,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#fbcfe8",
  },
});
