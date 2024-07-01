import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import axios from "axios";
import { useState, useCallback } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("screen");

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const CreateNewChatModal = ({ visible = true, setVisible }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchresults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  async function FindUser(username) {
    try {
      setLoading(true);
      const result = await axios.post("/friends/search", {
        username,
      });
      console.log(result.data);
      setSearchResults(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Wrap FindUser with useCallback to memoize it based on username
  const debouncedFindUser = useCallback(
    debounce((username) => FindUser(username), 500),
    []
  );

  return (
    <Modal visible={visible} transparent onDismiss={() => setVisible(false)}>
      <BlurView
        style={{
          ...StyleSheet.absoluteFill,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: HEIGHT * 0.3,
          }}
        >
          <View>
            <TextInput
              style={{
                height: 50,
                width: WIDTH - 40,
                backgroundColor: "white",
              }}
              placeholder="Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                debouncedFindUser(text); // Use debounced function
              }}
            />
          </View>

          <View>
            {loading && searchresults.length === 0 ? (
              <ActivityIndicator size="large" color="white" />
            ) : null}
          </View>
          <View>
            <ScrollView>
              {searchresults?.length > 0 ? (
                searchresults.map((item) => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("MESSAGE");
                      setVisible(false);
                    }}
                  >
                    <View
                      key={item.user_id}
                      style={{
                        height: 80,
                        width: 120,
                        backgroundColor: "green",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{item.username}</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <Text>No results</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default CreateNewChatModal;
const styles = StyleSheet.create({});
