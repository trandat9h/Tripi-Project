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
import { createStackNavigator } from "@react-navigation/stack";
import HotelDetail from "../HotelDetail";
import SearchResult from "../Homepage/SearchResult";
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const marginTop = Constants.statusBarHeight;

//Test Data

const hotel = [
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
      latitude: 37.78825,
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
    commentNumber: 5,
    likeNumber: 10,
    images: [
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
    ],
    coordinate: {
      latitude: 38.78825,
      longitude: -120.4324,
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
    likeNumber: 10,
    images: [
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
      require("../../assets/hotel.jpg"),
    ],
    coordinate: {
      latitude: 36.78825,
      longitude: -121.4324,
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require("../../assets/app-background.jpg")}
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
          <TouchableOpacity style={{ alignItems: "center", marginTop: 40 }}>
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
};

Stack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "HotelDetail") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

function Homepage() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HotelDetail" component={HotelDetail} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
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
    height: 220,
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
    marginTop: 10,
  },
});

export default Homepage;
