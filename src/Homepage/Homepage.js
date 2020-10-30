import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import TopHotel from "./TopHotel";
import {createStackNavigator} from '@react-navigation/stack';
import HotelDetail from '../HotelDetail';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const marginTop = Constants.statusBarHeight;
const hotel = [
  {
    name: "hellodhaudwqudwqudhqwud",
    location: "bla blo",
    loveStatus: false,
    rating: 4,
  },
  {
    name: "hello",
    location: "bla blo",
    loveStatus: false,
    rating: 4,
  },
  {
    name: "hello",
    location: "bla blo",
    loveStatus: false,
    rating: 4,
  },
];
const HomeScreen = () => {
  return(
    <View style={styles.container}>
    <View>
      <ImageBackground
        source={require("../../assets/background-image.jpg")}
        style={styles.backgroundImage}
      >
        <Image
          source={require("../../assets/app-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            color: "white",
            marginTop: 5,
          }}
        >
          Find your hotel
        </Text>
        <TouchableOpacity style={{ alignItems: "center", marginTop: 50 }}>
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={24} color="black" />
            <Text> Tìm vị trí, khách sạn...</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
    <ScrollView>
    <View>
      <Text style={styles.topic}>Được đề xuất cho bạn</Text>
      <Text style={styles.subTopic}> Top khách sạn hàng đầu Việt Nam</Text>
      <TopHotel hotels={hotel} />
    </View>
    </ScrollView>
  </View>
  );
}
function Homepage() {
  return (
      <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='HotelDetail' component={HotelDetail} />
      </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
  backgroundImage: {
    width: windowWidth,
    height: 250,
  },
  logo: {
    width: 72,
    height: 72,
    marginTop: 10,
    marginLeft: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    width: 350,
    height: 40,
    alignItems: "center",
    borderRadius: 20,
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  subTopic: {
    fontSize: 19,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 5,
  },
});

export default Homepage;
