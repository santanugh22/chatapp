import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import RegisterHeaderComponent from "../../components/register/RegisterHeaderComponent";
import RegisterFormComponent from "../../components/register/RegisterFormComponent";
import RegisterBottomComponent from "../../components/register/RegisterBottomComponent";
import { Children, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Register = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterUser = async () => {
    try {
      const result = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      await AsyncStorage.setItem("token", result.data.token);

      await AsyncStorage.setItem("username", result.data.username);
      await AsyncStorage.setItem("user_id", result.data.user_id);

      navigation.replace("CHAT");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <RegisterHeaderComponent />
      <RegisterFormComponent
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        RegisterUser={RegisterUser}
      />
      <RegisterBottomComponent />
    </SafeAreaView>
  );
};
export default Register;
const styles = StyleSheet.create({});
