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
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";



const windowWidth = Dimensions.get("window").width;
const marginTop = Constants.statusBarHeight;

function SearchResult({ navigation, route }) {
  const hotels = route.params.hotels;

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
          <Image source={{uri:item.images[0]}} style={styles.image} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.name}> {item.name}</Text>
              <View
                style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}
              >
                <Entypo name="location" size={18} color="red" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
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
  let markers = useRef([]);
  const onCarouselItemChange = (index) => {
    const location = hotels[index].coordinate;
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      longitudeDelta: 0.1022,
      latitudeDelta: 0.1021,
    });
   markers.current[index].showCallout();
  };

  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
          latitudeDelta: 0.1122,
          longitudeDelta: 0.1121,
        }}
      >
        {hotels.map((hotel, index) => (
          <Marker
           ref = {el => markers.current[index] = el}
            key={index}
            coordinate={{
              latitude: hotel.coordinate.latitude,
              longitude: hotel.coordinate.longitude,
            }}
          >
            <Callout>
              <Text>
                {hotel.price} VND
              </Text>
            </Callout>
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
  )}
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
    fontSize: 17,
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
