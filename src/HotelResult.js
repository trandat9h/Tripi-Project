import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import { AppLoading } from "expo";
import axios from "axios";
import {
  useFonts,
  Roboto_900Black,
  Roboto_700Bold,
  Roboto_100Thin,
} from "@expo-google-fonts/roboto";
import HotelCard_v2 from "./HotelCard_v2";
import { Entypo } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import Star from "react-native-star-view";

const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;
function HotelResult({ navigation, route }) {
  const filter = route.params.filterData;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [hotelCount, setHotelCount] = useState(10);
  const search = () => {
    axios
      .post("https://c1d4cf9da734.ngrok.io/filter", filter)
      .then((res) => {
        setResult(res.data);
        setLoading(false);
        const nextCount = hotelCount + 10;
        setHotelCount(nextCount);
        filter.hotelCountResult = hotelCount;
        console.log(hotelCount);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    search();
  }, []);
  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_700Bold,
  });
  if (!fontsLoaded || loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.slogan}> hotelResult</Text>
        </View>
        {/* <FlatList
          data={result}
          renderItem={HotelCardFlatlist}
          keyExtractor={(item) => item.name}
          onEndReached={search}
          onEndReachedThreshold={1}
          ListFooterComponent={<ActivityIndicator color="red" animating={loading} />}
        /> */}
        <ScrollView>
          {result.map((hotel, index) => {
            return <HotelCard_v2 hotel={hotel} key={index} />;
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.map}
          onPress={() =>
            navigation.navigate("SearchResult", {
              hotels: result.slice(0, result.length > 10 ? 10 : result.length),
              previousHotelExist: false,
            })
          }
        >
          <ImageBackground
            source={require("../assets/map-location-pin.jpg")}
            style={{ flex: 1 }}
            resizeMode="stretch"
          >
            <View style={styles.mapText}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto_700Bold",
                  fontSize: 15,
                }}
              >
                Bản đồ
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
  function HotelCardFlatlist({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("HotelDetail", { hotel: item })}
      >
        <View style={styles.cardWrapper}>
          <Image style={styles.image} source={{ uri: item.images[0] }} />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="location"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ width: 221 }} numberOfLines={2}>
                {item.location}
              </Text>
            </View>
            <NumberFormat
              value={Math.round(item.price)}
              thousandSeparator={true}
              displayType={"text"}
              renderText={(value) => (
                <Text style={styles.price}>Giá : {value} VND</Text>
              )}
            />
            <Star score={item.rating} style={styles.starRating} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
  slogan: {
    alignSelf: "center",
    fontSize: 23,
    fontFamily: "Roboto_900Black",
    marginTop: 20,
  },
  map: {
    width: 160,
    height: 60,
    position: "absolute",
    bottom: 20,
    left: windowWidth / 2 - 80,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  mapText: {
    height: 30,
    width: 80,
    position: "absolute",
    left: 37,
    top: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  cardWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E9E9E6",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 150,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
    marginTop: 9,
    width: 250,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  starRating: {
    width: 100,
    height: 20,
    marginTop: 15,
    marginRight: 20,
  },
});

export default HotelResult;
