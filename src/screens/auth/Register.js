import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RegisterHeaderComponent from "../../components/register/RegisterHeaderComponent";
import RegisterFormComponent from "../../components/register/RegisterFormComponent";
import RegisterBottomComponent from "../../components/register/RegisterBottomComponent";
const Register = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 2 * insets.top : null,
        backgroundColor: "#000",
      }}
    >
      <RegisterHeaderComponent />
      <RegisterFormComponent />
      <RegisterBottomComponent />
    </SafeAreaView>
  );
};
export default Register;
const styles = StyleSheet.create({});
