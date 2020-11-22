import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
const amenityImages = [
  {
    name: "Club",
    image: require("../Tripi/assets/Club.png"),
  },
  {
    name: "Massage",
    image: require("../Tripi/assets/massage.png"),
  },
  {
    name: "Sauna",
    image: require("../Tripi/assets/sauna.png"),
  },
  {
    name: "Spa",
    image: require("../Tripi/assets/Club.png"),
  },
  {
    name: "Swimming",
    image: require("../Tripi/assets/swimming-pool.png"),
  },
  {
    name: "Tour",
    image: require("../Tripi/assets/tour.png"),
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
