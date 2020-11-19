import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import HotelCard from "./HotelCard";
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
const windowWidth = Dimensions.get("window").get;

function TopRating({ hotels }) {
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={windowWidth}
        >
          {hotels.map((hotel, index) => {
            return (
              <View key={index} style={{ marginLeft: 20 }}>
                <HotelCard hotel={hotel} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TopRating;
