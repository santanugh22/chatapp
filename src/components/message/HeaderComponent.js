import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

const HeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const username = route.params.receiver_username;

  return (
    <View
      style={{
        height: HEIGHT * 0.1,
        width: WIDTH,

        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: WIDTH * 0.16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          width: WIDTH * 0.66,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          {username}
        </Text>
      </View>
      <View
        style={{
          width: WIDTH * 0.16,
        }}
      ></View>
    </View>
  );
};
export default HeaderComponent;
const styles = StyleSheet.create({});
