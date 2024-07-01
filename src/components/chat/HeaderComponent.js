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
import NewChatModal from "./NewChatModal";
const HeaderComponent = () => {
  const { isConnected } = useNetInfo();
  const navigation = useNavigation();


  const [username,setUsername] = useState("")

  const [showFriends, setShowFriends] = useState(false);

  async function Logout() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      navigation.replace("LOGIN");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    (async()=>{
      await AsyncStorage.getItem("username").then((value)=>{  
        setUsername(value)
      })
    })()
  })
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
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:4}}>
        <View style={{
          flexDirection:"row"
        }}>
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
        <View style={{
          flexDirection:"row"
        }}>
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
      <NewChatModal visible={showFriends} setVisible={setShowFriends} />
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
