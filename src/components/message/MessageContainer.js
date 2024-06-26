import { StyleSheet, Text, View,Dimensions } from 'react-native'
const {height:HEIGHT,width:WIDTH} = Dimensions.get('screen')    
const MessageContainer = () => {
  return (
    <View style={{
        height:HEIGHT*0.7,
        width:WIDTH,
        justifyContent:"center",
        alignItems:"center"
        
    }}>
      <Text>MessageContainer</Text>
    </View>
  )
}
export default MessageContainer
const styles = StyleSheet.create({})