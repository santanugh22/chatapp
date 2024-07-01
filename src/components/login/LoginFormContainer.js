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
import { useNavigation } from "@react-navigation/native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");
const LoginFormContainer = ({ email, setEmail, password, setPassword, LoginUser }) => {
  const [view, setView] = useState(false);
  const navigation=useNavigation()

  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainForm}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" style={styles.input} ref={ref} value={email} onChangeText={setEmail}/>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={view} value={password} onChangeText={setPassword}
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
          <Pressable onPress={()=>LoginUser()}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
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
