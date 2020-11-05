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
import { useNavigation } from "@react-navigation/native";

const marginTop = Constants.statusBarHeight;
const cities = [
  { name: "HÀ NỘI", image: require("../assets/hotel.jpg") },
  { name: "ĐÀ NẴNG", image: require("../assets/hotel.jpg") },
  { name: "ĐÀ LẠT", image: require("../assets/hotel.jpg") },
];
function HotelByCities() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cities.map((city, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('SearchResult', {previousHotelExist: false})}>
              <View style={styles.cardWrapper} >
                <Image source={city.image} style={styles.image} />
                <Text style={styles.name}> {city.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 15,
  },
  cardWrapper: {
    marginLeft: 20,
  },
  name: {
    position: "absolute",
    bottom: 5,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default HotelByCities;
