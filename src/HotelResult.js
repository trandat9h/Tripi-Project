import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { AppLoading } from "expo";
import axios from "axios";
import { useFonts, Roboto_900Black } from "@expo-google-fonts/roboto";
import SearchResult from "./Homepage/SearchResult";
import HotelCard_v2 from "./HotelCard_v2";
const marginTop = Constants.statusBarHeight;
function HotelResult({ navigation, route }) {
  const filter = route.params.filterData;
   const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const search = () => {
    axios
      .post("https://b298c1e74d3f.ngrok.io/filter", filter)
      .then((res) => {
        setResult(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    search();
  }, []);
  let [fontsLoaded] = useFonts({
    Roboto_900Black,
  });
  if (!fontsLoaded || loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.slogan}> hotelResult</Text>
        </View>
        <ScrollView>
          {result.map((hotel, index) => {return (<HotelCard_v2  hotel={hotel} key={index}/>)})}
        </ScrollView>
      </View>
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
});

export default HotelResult;
