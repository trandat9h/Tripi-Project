import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import TopHotel from "./TopHotel";
import { createStackNavigator } from "@react-navigation/stack";
import HotelDetail from "../HotelDetail";
import SearchResult from "../Homepage/SearchResult";
import BookingConfirmation from "../BookingConfirmation";
import HotelSearchBar from "../HotelSearchBar";
import HotelByCities from "../HotelByCities";
import TopRating from "../TopRating";
import { useNavigation } from "@react-navigation/native";
import {
  Roboto_400Regular_Italic,
  useFonts,
  Roboto_500Medium_Italic,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import axios from "axios";
const Stack = createStackNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const marginTop = Constants.statusBarHeight;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const getHotel = () => {
    axios
      .get("https://64019bd8568b.ngrok.io/homepage")
      .then((res) => {
        setHotel(res.data), setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getHotel();
  }, []);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
  });
  if (!fontsLoaded || loading ) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <View>
          <ImageBackground
            source={require("../../assets/cover.jpg")}
            style={styles.backgroundImage}
          >
            <Image
              source={require("../../assets/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                color: "white",
                marginTop: 5,
                fontFamily: "Roboto_500Medium_Italic",
              }}
            >
              Bạn muốn đi đâu?
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 40 }}
              onPress={() => {
                navigation.navigate("HotelSearchBar", { hotel: hotel[0] });
              }}
            >
              <View style={styles.searchBar}>
                <AntDesign name="search1" size={24} color="black" />
                <Text style={{ opacity: 0.6 }}> Tìm vị trí, khách sạn...</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View>
          <Text style={styles.topic}>Được đề xuất cho bạn</Text>
          <Text style={styles.subTopic}> Top khách sạn hàng đầu Việt Nam</Text>
          <TopHotel hotels={hotel} />
        </View>
        <View>
          <Text style={styles.topic}>Mùa đông này mình đi đâu?</Text>
          <HotelByCities  hotels={hotel}/>
          <Text style={styles.topic}>1 cái gì đó ngầu ko kém</Text>
          <Text style={styles.subTopic}> 1 câu làm câu trên ngầu hơn</Text>
          <TopRating hotels={hotel} />
        </View>
      </ScrollView>
    );
  }
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
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="HotelSearchBar" component={HotelSearchBar} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
    backgroundColor: "#EFEFEF",
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
    backgroundColor: "#f9f9f9",
    width: 350,
    height: 40,
    alignItems: "center",
    borderRadius: 20,
  },
  topic: {
    fontFamily: "Roboto_400Regular_Italic",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  subTopic: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Homepage;
