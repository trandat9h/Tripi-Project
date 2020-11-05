import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import HotelCard from "./HotelCard";
const marginTop = Constants.statusBarHeight;
function TopRating({ hotels }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hotels.map((hotel, index) => {
          return (
              <View key={index} style={{marginLeft: 20,}}>
              <HotelCard hotel={hotel} />
              </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TopRating;
