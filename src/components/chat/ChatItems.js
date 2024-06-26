import { StyleSheet, Text, View,Dimensions } from 'react-native'
const {height:HEIGHT,width:WIDTH}=Dimensions.get("screen")
const ChatItems = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={{
        justifyContent:"center",
        height:"100%",
        paddingLeft:3
      }}>
        <Text style={{
            fontSize:20,
        }}>Shantanu Ghosh</Text>
      </View>
    </View>
  )
}
export default ChatItems
const styles = StyleSheet.create({
  mainContainer: {
    height: HEIGHT * 0.08,
    width: WIDTH * 0.95,
    backgroundColor: "#93c5fd",
    borderRadius:7,
    alignSelf:"center",
    marginBottom:2
  },
});