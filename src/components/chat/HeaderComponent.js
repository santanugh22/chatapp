import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite/next";
import NewChatModal from "./NewChatModal";
const HeaderComponent = ({ showFriend, setShowFriend }) => {
  const { isConnected } = useNetInfo();
  const navigation = useNavigation();

  const [db, setdb] = useState(null);

  const [username, setUsername] = useState("");

  async function Logout() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      await db.execAsync("DELETE FROM messages;")

      navigation.replace("LOGIN");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("username").then((value) => {
        setUsername(value);
      });
      const db = await SQLite.openDatabaseAsync("chatapp.db");
      setdb(db);
    })();
  });
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {isConnected ? (
          <Text style={{ color: "white", fontSize: 24 }}>Chat App</Text>
        ) : (
          <View
            style={{
              flexDirection: "row",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="small" color="white" />
            <Text style={{ color: "white" }}>Connecting to internet</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable onPress={() => setShowFriend(true)}>
            <View
              style={{
                backgroundColor: "green",
                padding: 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                New Chat
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setShowFriends(true)}>
            <Text
              style={{
                color: "white",
                fontSize: 17,
              }}
            >
              {username}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable onPress={() => Logout()}>
            <View
              style={{
                height: 40,
                width: 80,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Logout</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default HeaderComponent;
const styles = StyleSheet.create({
  mainContainer: {
    width: WIDTH,
    height: HEIGHT / 10,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
