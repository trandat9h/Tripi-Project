import React, { useEffect, useState } from "react";
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
import axios from 'axios';

const marginTop = Constants.statusBarHeight;
const cities = [
  { name: "HÀ NỘI", image: require("../assets/HN.jpg") },
  { name: "ĐÀ NẴNG", image: require("../assets/ĐN.jpg") },
  { name: "ĐÀ LẠT", image: require("../assets/ĐL.jpg") },
  { name: "PHÚ QUỐC", image: require("../assets/PQ.jpg") },
  { name: "SÀI GÒN", image: require("../assets/SG.jpg") },
  { name: "HẠ LONG", image: require("../assets/HL.jpg") },

];
function HotelByCities() {
  const URL = 'https://9c3caf23bf5f.ngrok.io/cityFilter';
  const [loading, setLoading] = useState(true);
  const [hotels, setHotel] = useState([]);
  const navigation = useNavigation();
  const getHotel = () => {
    const requestOne = axios.post(URL, {city: 'Hà Nội'});
    const requestTwo = axios.post(URL, {city: 'Đà Nẵng'});
    const requestThree = axios.post(URL, {city: 'Lâm Đồng'});
    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0].data;
      const responseTwo = responses[1].data;
      const responseThree = responses[2].data;
      setHotel([responseOne, responseTwo, responseThree]);
      setLoading(false);
      console.log('done');
    })).catch(errors => {
      console.log(errors);
    })
  }
  useEffect(() =>{getHotel()}, []);
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cities.map((city, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('SearchResult', {previousHotelExist: false, hotels: hotels[index]})}>
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
