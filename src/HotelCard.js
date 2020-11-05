import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import {AntDesign, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const marginTop = Constants.statusBarHeight;
function HotelCard({hotel}) {
    const navigation = useNavigation();
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
            <View style={{ flexDirection: "column", backgroundColor: "green" }}>
              <Text style={styles.price}>{hotel.price}$</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.rating}>{hotel.rating}</Text>
                <AntDesign name="star" size={24} color="yellow" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    cardWrapper: {
      backgroundColor: "white",
      height: 200,
      width: 350,
      borderRadius: 20,
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