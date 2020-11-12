import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { Foundation } from '@expo/vector-icons';

const cities = ["Hà Nội", "Đà Nẵng", "TP.HCM"];
const TopHotel = ({ hotels }) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hotels.map((hotel, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('HotelDetail',{
                hotel: hotel,
            })} >
              <View style={styles.hotelWrapper}>
                <Image
                  style={styles.image}
                  source={require("../../assets/hotel.jpg")}
                />
                <Entypo name="heart-outlined" size={35} color="#FE0000" style={styles.like} />
                <View style={styles.location}>
                  <Entypo name="location-pin" size={27} color="red" />
                  <Text style={{ fontSize: 18, fontWeight: '600',color:"white", marginRight: 7 }}>
                    {cities[index]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.hotelText}>{hotel.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rating}>{hotel.rating}</Text>
                    <Foundation name="star" size={26} color="#EFCE4A" style={{marginRight: 8}} />
                  </View>
                </View>
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
  hotelWrapper: {
    height: 320,
    backgroundColor:"#FFFFFF",
    flexDirection: "column",
    marginLeft: 20,
    width: 230,
    borderRadius: 20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.41,
shadowRadius: 9.11,

elevation: 14,
    
  },
  image: {
    width: 230,
    height: 245,
    borderRadius: 20,
    marginBottom: 5,
  },
  hotelText: {
    fontSize: 19,
    flexShrink: 1,
    marginRight: 5,
    marginLeft: 10,
  },
  like: {
    position: "absolute",
    top: 13,
    left: 180,
  },
  location: {
    backgroundColor: "grey",
    position: "absolute",
    flexDirection: "row",
    top: 213,
    borderTopRightRadius:20,
    borderBottomLeftRadius: 20,
    opacity: 0.8,
    paddingTop: 3,
    paddingRight: 5,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 4,

  }
});

export default TopHotel;
