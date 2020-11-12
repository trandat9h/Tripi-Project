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
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";

const marginTop = Constants.statusBarHeight;
const cities = [
  { name: "HÀ NỘI", image: require("../assets/hotel.jpg") },
  { name: "ĐÀ NẴNG", image: require("../assets/hotel.jpg") },
  { name: "ĐÀ LẠT", image: require("../assets/hotel.jpg") },
];
function HotelByCities({hotels}) {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cities.map((city, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('SearchResult', {previousHotelExist: false, hotels: hotels})}>
              <View style={styles.cardWrapper} >
                <Image source={city.image} style={styles.image} />
                <Text style={styles.name}> {city.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HotelByCities;
