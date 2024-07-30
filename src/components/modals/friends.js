import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Friends = ({ visible, setVisible }) => {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [userid, setUserid] = useState("");
  const [username, setusername] = useState("");

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("user_id");
      const usern = await AsyncStorage.getItem("username");
      setusername(usern);
      setUserid(id);
    })();
  }, []);

  //write a debouncing function here
  const debouncing = (fn, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  };

  async function SearchFriends() {
    try {
      const response = await axios.post("/friends/search", {
        username: search,
      });
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 400,
          }}
        >
          <Pressable onPress={() => setVisible(false)}>
            <View
              style={{
                padding: 7,
                backgroundColor: "red",
              }}
            >
              <Text>Close</Text>
            </View>
          </Pressable>
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Search friends
          </Text>

          <TextInput
            placeholder="Search friends"
            style={{
              height: 50,
              width: 200,
              backgroundColor: "white",
            }}
            value={search}
            onChangeText={setSearch}
            autoCapitalize={"none"}
          />
          <Pressable onPress={debouncing(SearchFriends, 1000)}>
            <View
              style={{
                height: 60,
                width: 80,
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Search</Text>
            </View>
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 100,
          }}
        >
          <FlatList
            data={friends}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("MESSAGE", {
                      receiver_id: item.user_id,
                      receiver_username: item.username,
                      user_id: userid,
                      username: username,
                    });
                    setVisible(false);
                  }}
                >
                  <View
                    style={{
                      height: 30,
                      width: 140,
                      backgroundColor: "red",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      {item.username}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default Friends;
const styles = StyleSheet.create({});
