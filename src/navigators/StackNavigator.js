import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Chat from "../screens/chat/Chat";
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="REGISTER" component={Register} />
      <Stack.Screen name="CHAT" component={Chat} />
    </NavigationContainer>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({});
