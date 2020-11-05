import React from "react";
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Constants from "expo-constants";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HotelCard_v2 from './HotelCard_v2';

const windowWidth = Dimensions.get("window").width;
const marginTop = Constants.statusBarHeight;

function HotelDetail({ route, navigation }) {
  const { hotel } = route.params;
  const relevantHotels = [hotel, hotel, hotel];
  return (
    <View style={styles.container}>
      <ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        snapToInterval={windowWidth}
      >
        {hotel.images.map((image, index) => {
          return <Image source={image} style={styles.hotelImage} key={index} />;
        })}
      </ScrollView>
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{alignItems:'center',justifyContent:'center', position: "absolute", top: 20, left: 20, backgroundColor:'#f9f9f9', height: 36,width: 36, borderRadius: 18, }} >
      <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity  style={{ position: "absolute", top: 20, right: 20, alignItems:'center',justifyContent:'center',height: 36, width: 36, borderRadius: 18,backgroundColor:'#f9f9f9'}}>
      <AntDesign
        name="hearto"
        size={26}
        color="red"
      />
      </TouchableOpacity>
      <View style={styles.borderCover}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <Entypo name="location" size={19} color="red" />
        <Text style={{ marginLeft: 4, fontSize: 16 }}> {hotel.location}</Text>
      </View>
      <Entypo
        name="map"
        size={38}
        color="green"
        style={styles.mapIcon}
        onPress={() =>
          navigation.navigate("SearchResult", {
            hotels: [hotel, hotel, hotel, hotel, hotel],
            previousHotelExist: true,
          })
        }
      />
        <View style={styles.amenities}></View>
        <View>
          <TouchableOpacity
            style={{ alignItems: "center", marginVertical: 10 }}
          >
            <View style={styles.feedbackWrapper}>
              <View style={styles.feedbackIcon}>
                <Text style={{ marginRight: 10 }}>{hotel.rating}</Text>
                <AntDesign name="star" size={24} color="yellow" />
              </View>
              <View style={styles.feedbackIcon}>
                <Text style={{ marginRight: 10 }}>{hotel.commentNumber}</Text>
                <FontAwesome name="commenting-o" size={24} color="black" />
              </View>
              <View style={styles.feedbackIcon}>
                <Text style={{ marginRight: 10 }}>{hotel.likeNumber}</Text>
                <FontAwesome name="heart" size={24} color="red" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
            marginVertical: 7,
            height: 2,
            width: windowWidth,
            backgroundColor: "grey",
          }}
        />
        <Text style={styles.topic}>
          Có thể bạn cũng muốn xem
        </Text>
        {relevantHotels.map((hotel, index) => {return(<HotelCard_v2 hotel={hotel} key={index}/>)})}
        
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={() => {
        navigation.navigate('BookingConfirmation',{hotel: hotel})
      }}>
            <Text style={{fontWeight: 'bold',fontSize: 20,}} >{hotel.price}$/day</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: marginTop,
    flex: 1,
    backgroundColor:"#f9f9f9"
  },
  hotelImage: {
    width: windowWidth,
    height: 300,
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 21,
    marginLeft: 20,
    marginBottom: 5,
  },
  borderCover: {
    height: 51, // tại sao 51 lại sai
    width: windowWidth,
    backgroundColor: "#f9f9f9",
    justifyContent: "flex-end",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    top: 250,
  },
  mapIcon: {
    position: "absolute",
    top: 275,
    left: 360,
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
  },
  topic: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  continueButton: {
    position:'absolute',
    bottom: 10,
    left: windowWidth*1/12,
    height: 60,
    width: windowWidth*5/6,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#D67B60",
    borderRadius: 30,
  }
});

export default HotelDetail;
