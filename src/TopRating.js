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
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";

const marginTop = Constants.statusBarHeight;
function TopRating({ hotels }) {
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TopRating;
