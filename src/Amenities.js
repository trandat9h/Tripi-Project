import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
const amenityImages = [
  {
    name: "Bar",
    image: require("../assets/Bar.png"),
  },
  {
    name: "Currency exchange",
    image: require("../assets/currency-exchange.png"),
  },
  {
    name: "Giặt là",
    image: require("../assets/laundry.png"),
  },
  {
    name: "Nhà hàng",
    image: require("../assets/restaurant.png"),
  },
  {
    name: "Két sắt",
    image: require("../assets/safe.png"),
  },
  {
    name: "Cửa hàng",
    image: require("../assets/shop.png"),
  },
  {
    name: "Mát xa",
    image: require("../assets/massage.png"),
  },
  {
    name: "Spa",
    image: require("../assets/spa.png"),
  },
  {
    name: "Dịch vụ 24h",
    image: require("../assets/support-24h-service.png"),
  },
  {
    name: "Bể bơi",
    image: require("../assets/swimming-pool.png"),
  },
  {
    name: "Tour tham quan",
    image: require("../assets/tour-guide.png"),
  },
  {
    name: "Trẻ em",
    image: require("../assets/baby.png"),
  },
  
];
function Amenities({ amenities }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {amenities.map((amenity, index) => {
            if(amenity === 1)
          return (
            <View style={styles.wrapper} key={index}>
              <Image source={amenityImages[index].image} resizeMode='contain' style={styles.image} />
              <Text> {amenityImages[index].name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    height: 100,
  },
  image: {
      width: 30,
      height: 30,
  },
  wrapper: {
      flexDirection:'column',
      height: 100,
      justifyContent:"center",
      marginLeft: 20,
      alignItems:"center",
  }
});

export default Amenities;
