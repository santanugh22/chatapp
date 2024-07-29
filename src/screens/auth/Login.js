import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginHeader from "../../components/login/LoginHeader";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginFormContainer from "../../components/login/LoginFormContainer";
import LoginBottomContainer from "../../components/login/LoginBottomContainer";
import axios from "axios";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function LoginUser() {
    try {
      const result = await axios.post("/auth/login", { email, password });
      console.log(result, "result");
      const { token, username, user_id } = result?.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("user_id", user_id);
      setLoggedIn(true);
    } catch (error) {
      setError("Invalid credentials");
    }
  }

  async function CheckLoginStatus() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    CheckLoginStatus();
    if (loggedIn) {
      navigation.replace("CHAT");
    }
  }, [loggedIn]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <LoginHeader />
      <KeyboardAvoidingView keyboardVerticalOffset={12} behavior="height">
        <LoginFormContainer
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          LoginUser={LoginUser}
          setError={setError}
        />
      </KeyboardAvoidingView>
      <LoginBottomContainer error={error} />
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({});
