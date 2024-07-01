import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Chat from "../screens/chat/Chat";
import InitializeDB from "../db/InitializeDB";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AxiosContext from "../utils/AxiosContext";
const Stack = createStackNavigator();
import useSocket from "../hooks/useSocket";
import axios from "axios";
import { createContext, useEffect } from "react";
import SocketContext from "../utils/SocketContext";
import MessagingPage from "../screens/chat/MessagingPage";
const StackNavigator = () => {
  axios.defaults.baseURL = "https://chatappbackend-vfg8.onrender.com/api";

  // const { socket, error, connected } = useSocket(
  //   "https://chatappbackend-vfg8.onrender.com"
  // );


  useEffect(() => {
    InitializeDB();
  }, []);

  return (
    // <SocketContext.Provider value={socket}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LOGIN" component={Login} />
          <Stack.Screen name="REGISTER" component={Register} />
          <Stack.Screen name="CHAT" component={Chat} />
          <Stack.Screen name="MESSAGE" component={MessagingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    // </SocketContext.Provider>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({});
