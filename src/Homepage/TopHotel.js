import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const cities = ["Hà Nội", "Đà Nẵng", "TP.HCM"];
function TopHotel({ hotels }) {
  const navigation = useNavigation();
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
                <AntDesign
                  name="heart"
                  size={27}
                  color="red"
                  style={styles.like}
                />
                <View style={styles.location}>
                  <Entypo name="location-pin" size={27} color="red" />
                  <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
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
                    <Text style={styles.hotelText}>{hotel.rating}</Text>
                    <AntDesign name="star" size={24} color="yellow" />
                  </View>
                </View>
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
    marginTop: 10,
  },
  hotelWrapper: {
    flexDirection: "column",
    marginLeft: 20,
    width: 200,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 5,
  },
  hotelText: {
    fontSize: 20,
    flexShrink: 1,
    marginRight: 5,
  },
  like: {
    position: "absolute",
    top: 10,
    left: 160,
  },
  location: {
    position: "absolute",
    flexDirection: "row",
    top: 170,
  },
});

export default TopHotel;
