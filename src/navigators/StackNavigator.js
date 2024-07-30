import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Chat from "../screens/chat/Chat";
import InitializeDB from "../db/InitializeDB";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { io } from "socket.io-client";

const Stack = createStackNavigator();

import axios from "axios";
import { useEffect, useState } from "react";
import SocketContext from "../utils/SocketContext";
import MessagingPage from "../screens/chat/MessagingPage";
const StackNavigator = () => {
  axios.defaults.baseURL = "https://chatly-backend-8325.onrender.com/api";

  const [socket, setSocket] = useState(null);

  async function initializeSocket() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return;
      }
      const socket = io("https://chatly-backend-8325.onrender.com", {
        extraHeaders: {
          token: token,
        },
      });
      socket.on("error", (error) => {
        console.log(error);
      });
      setSocket(socket);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    InitializeDB();
    initializeSocket();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
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
    </SocketContext.Provider>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({});
