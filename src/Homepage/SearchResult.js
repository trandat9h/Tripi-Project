import React from "react";
import { StyleSheet, View, Image,Text } from "react-native";
import Constants from 'expo-constants';
const marginTop = Constants.statusBarHeight;
function SearchResult() {
  return (
    <View style={styles.container}>
      <Text> SeachResult</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
});

export default SearchResult;
