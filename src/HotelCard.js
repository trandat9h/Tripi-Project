import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { Foundation } from '@expo/vector-icons';
const windowWidth = Dimensions.get("window").width;
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
          <Image source={{uri:hotel.images[0]}} style={styles.image} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name} numberOfLines={1}> {hotel.name}</Text>
              <View
                style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}
              >
                <Entypo name="location" size={20} color="red" />
                <Text style={styles.location} numberOfLines={2}>{hotel.location}</Text>
              </View>
              <Text style={styles.price}>{hotel.price}VND</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
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
      marginTop: 10,

    },
    cardWrapper: {
      backgroundColor: "white",
      height: 235,
      width: windowWidth-40,
      borderRadius: 20,
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,
    },
    image: {
      width: windowWidth-40,
      height: 130,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 5,
      width:320,
    },
    location: {
      fontSize: 15,
      fontWeight: "600",
      marginLeft: 5,
      width: 300,
    },
    price: {
      fontWeight: "bold",
      fontSize: 17,
      marginRight: 10,
      marginTop: 2,
      marginLeft: 9
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