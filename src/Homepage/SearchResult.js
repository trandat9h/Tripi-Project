import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Callout, Marker } from "react-native-maps";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";

const hotels = [
  {
    name: "hellodhdwdwđqqsdqdw",
    location: "bla blịdiwdjiưudhưudwd",
    loveStatus: false,
    rating: 4,
    amenitites: [1, 1, 1, 0, 1],
    images: [
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
    ],
    coordinate: {
      latitude: 38.78929,
      longitude: -122.4324,
    },
    price: 100,
    commentNumber: 5,
    likeNumber: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "hello",
    location: "bla blo",
    loveStatus: false,
    rating: 4,
    price: 140,
    commentNumber: 5,
    likeNumber: 10,
    images: [
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
    ],
    coordinate: {
      latitude: 38.78836,
      longitude: -122.4324,
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "hello",
    location: "bla blo",
    loveStatus: false,
    rating: 4,
    commentNumber: 5,
    price: 300,
    likeNumber: 10,
    images: [
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
    ],
    coordinate: {
      latitude: 38.79225,
      longitude: -122.4324,
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const windowWidth = Dimensions.get("window").width;
const marginTop = Constants.statusBarHeight;

function SearchResult({ navigation, route }) {

  const renderCarouselItem = ({ item }) => {
    //const navigation = useNavigation();
    
    return (
      <TouchableOpacity
        onPress={() => {
          if(route.params.previousHotelExist === false)
          navigation.navigate("HotelDetail", { hotel: item });
        }}
      >
        <View style={styles.carouselItem}>
          <Image source={item.images[0]} style={styles.image} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name}> {item.name}</Text>
              <View
                style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}
              >
                <Entypo name="location" size={23} color="red" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", backgroundColor: "green" }}>
              <Text style={styles.price}>{item.price}$</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.rating}>{item.rating}</Text>
                <AntDesign name="star" size={24} color="yellow" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  let mapRef = useRef();
  const onCarouselItemChange = (index) => {
    const location = hotels[index].coordinate;
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      longitudeDelta: 0.0022,
      latitudeDelta: 0.0021,
    });
  };

  //cons hotels = route.params.hotels;
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        {hotels.map((hotel, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hotel.coordinate.latitude,
              longitude: hotel.coordinate.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text>{hotel.price}$</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <Carousel
        data={hotels}
        renderItem={renderCarouselItem}
        containerCustomStyle={styles.carousel}
        sliderWidth={windowWidth}
        itemWidth={350}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />

      <Feather
        name="arrow-left-circle"
        size={35}
        color="black"
        style={{ position: "absolute", top: 20, left: 20 }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
  carousel: {
    position: "absolute",
    bottom: 20,
  },
  carouselItem: {
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

export default SearchResult;
