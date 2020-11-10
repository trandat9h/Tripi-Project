import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { Foundation } from '@expo/vector-icons';

const marginTop = Constants.statusBarHeight;
function HotelCard({hotel}) {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>
           <TouchableOpacity
        onPress={() => {
          
          navigation.navigate("HotelDetail", { hotel: hotel });
        }}
      >
        <View style={styles.cardWrapper}>
          <Image source={hotel.images[0]} style={styles.image} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name}> {hotel.name}</Text>
              <View
                style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}
              >
                <Entypo name="location" size={23} color="red" />
                <Text style={styles.location}>{hotel.location}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.price}>{hotel.price}VND</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.rating}>{hotel.rating}</Text>
                <Foundation name="star" size={26} color="#EFCE4A"/>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 20,

    },
    cardWrapper: {
      backgroundColor: "white",
      height: 200,
      width: 350,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      
      elevation: 6,
    },
    image: {
      width: 350,
      height: 120,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 5,
    },
    location: {
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 5,
    },
    price: {
      fontWeight: "bold",
      fontSize: 17,
      marginRight: 10,
      marginTop: 2,
    },
    rating: {
      marginRight: 5,
      fontSize: 15,
    },
    marker: {
      height: 30,
      width: 80,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "aqua",
      borderRadius: 20,
    },
  });
  
export default HotelCard;