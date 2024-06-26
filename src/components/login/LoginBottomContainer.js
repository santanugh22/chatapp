import { StyleSheet, Text, View,Dimensions, Pressable } from 'react-native'
const {height:HEIGHT,width:WIDTH}=Dimensions.get("screen")
import { useNavigation } from '@react-navigation/native'
const LoginBottomContainer = () => {
  const navigation=useNavigation()
  return (
    <View style={styles.mainContainer}>
  <View style={{
    flexDirection:"row",
    gap:3
  }}>
    <Text style={{
      color:"white",
      fontSize:16
    }}>Do not have an account ?</Text>
    <Pressable style={{
      justifyContent:"center",
      alignItems:"center"
    }}
    onPress={()=>navigation.navigate("REGISTER")}
    >
      <Text style={{
        color:"#be185d",
        fontSize:16
      
      }}>Register</Text>
    </Pressable>
  </View>
    </View>
  )
}
export default LoginBottomContainer
const styles = StyleSheet.create({
  mainContainer:{
    height:HEIGHT*0.1,
    width:WIDTH,
    justifyContent:"center",
    alignItems:"center",

  }
})