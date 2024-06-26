import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigators/StackNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
