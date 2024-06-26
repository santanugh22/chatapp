import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginHeader from "../../components/login/LoginHeader";
import AxiosContext from "../../utils/AxiosContext";

const Login = () => {
  const insets = useSafeAreaInsets();
  const axiosInstance = useContext(AxiosContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
      }}
    >
      <LoginHeader />
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({});
