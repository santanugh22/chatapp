import { StyleSheet, Text, View ,Dimensions, Pressable} from 'react-native'
const {height:HEIGHT,width:WIDTH}=Dimensions.get("screen")
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
const RegisterHeaderComponent = () => {
    const navigation=useNavigation()
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: WIDTH * 0.25,
            justifyContent: "center",
            alignItems: "center",
        }}
      >
        <Pressable onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          width: WIDTH * 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          Register
        </Text>
      </View>
      <View
        style={{
          width: WIDTH * 0.25,
        }}
      ></View>
    </View>
  );
}
export default RegisterHeaderComponent
const styles = StyleSheet.create({
    mainContainer:{
        height:HEIGHT*0.1,
        width:WIDTH,
        flexDirection:"row",
        
    }
})