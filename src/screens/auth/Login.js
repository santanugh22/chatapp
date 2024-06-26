import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginHeader from "../../components/login/LoginHeader";
const Login = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex:1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
      }}
    >
      <LoginHeader/>
      


    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({});
