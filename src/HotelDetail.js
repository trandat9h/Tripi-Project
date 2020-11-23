import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { Entypo, AntDesign } from "@expo/vector-icons";
import HotelCard_v2 from "./HotelCard_v2";
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import Amenities from "./Amenities";
import NumberFormat from "react-number-format";
import axios from "axios";

const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;

const HotelDetail = ({ route, navigation }) => {
  const { hotel } = route.params;
  //console.log(hotel.hotel_id);
  useEffect(() => {
    axios.post("https://1c058dc3e235.ngrok.io/updateModal", {
      Id: hotel.hotel_id,
    }).then(res => console.log(res.data))
    .catch(err => console.log(err))
  },[]);
  const relevantHotels = [hotel, hotel, hotel];
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={windowWidth}
          >
            {hotel.images.map((image, index) => {
              return (
                <Image
                  source={{ uri: image }}
                  style={styles.hotelImage}
                  key={index}
                />
              );
            })}
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 20,
              left: 20,
              backgroundColor: "#f9f9f9",
              height: 36,
              width: 36,
              borderRadius: 18,
            }}
          >
            <AntDesign name="arrowleft" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#f9f9f9",
            }}
          >
            <AntDesign name="hearto" size={26} color="red" />
          </TouchableOpacity>
          <View style={styles.borderCover}>
            
          </View>
          <Text style={styles.hotelName} numberOfLines={2}>
                {hotel.name}
              </Text>
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, }}>
            <Entypo name="location" size={16} color="red" />
            <Text style={{ marginLeft: 4, fontSize: 13, width: windowWidth - 55, lineHeight: 25, }}>
              {hotel.location}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SearchResult", {
                hotels: [hotel],
                previousHotelExist: true,
              })
            }
            style={styles.mapIcon}
          >
            <Image
              source={require("../assets/Map.png")}
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
          <Amenities amenities={hotel.amenities} />
          <View
            style={{
              marginVertical: 7,
              height: 2,
              width: windowWidth,
              backgroundColor: "grey",
            }}
          />
          <Text style={styles.topic}> Miêu tả</Text>
          <Text style={styles.description} numberOfLines={4}>
            {hotel.description}
          </Text>
          <View
            style={{
              marginVertical: 13,
              height: 2,
              width: windowWidth,
              backgroundColor: "grey",
            }}
          />
          <Text style={styles.topic}>Có thể bạn cũng muốn xem</Text>
          {relevantHotels.map((hotel, index) => {
            return <HotelCard_v2 hotel={hotel} key={index} />;
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate("BookingConfirmation", { hotel: hotel });
          }}
        >
          <NumberFormat
            value={hotel.price}
            thousandSeparator={true}
            displayType={"text"}
            renderText={(value) => (
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
              >
                {value} VND / Ngày{" "}
              </Text>
            )}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: marginTop,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  hotelImage: {
    width: windowWidth,
    height: 280,
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    marginTop: -10,
    width: 320,
    lineHeight: 23,
  },
  borderCover: {
    height: 31, // tại sao 51 lại sai
    width: windowWidth,
    backgroundColor: "#f9f9f9",
    justifyContent: "flex-end",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    top: 250,
  },
  mapIcon: {
    width: 35,
    height: 35,
    position: "absolute",
    top: 260,
    left: 350,
  },
  amenities: {
    height: 80,
    backgroundColor: "red",
    marginTop: 10,
  },
  feedbackWrapper: {
    width: 300,
    borderColor: "green",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
  },
  feedbackIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: "Roboto_400Regular_Italic",
  },
  topic: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  continueButton: {
    position: "absolute",
    bottom: 10,
    left: (windowWidth * 1) / 12,
    height: 60,
    width: (windowWidth * 5) / 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FC3B3B",
    borderRadius: 30,
  },
  feedbackText: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HotelDetail;
