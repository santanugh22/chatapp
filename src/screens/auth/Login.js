import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginHeader from "../../components/login/LoginHeader";
import AxiosContext from "../../utils/AxiosContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginFormContainer from "../../components/login/LoginFormContainer";
import LoginBottomContainer from "../../components/login/LoginBottomContainer";

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const axiosInstance = useContext(AxiosContext);
  // const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function LoginUser() {
    try {
      const result = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      const { token, username } = result.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function CheckLoginStatus() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);

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
      console.log("MEOW");
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
        />
      </KeyboardAvoidingView>
      <LoginBottomContainer />
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({});
