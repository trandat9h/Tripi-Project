import React, { useState } from "react";
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
import {
  Roboto_400Regular_Italic,
  useFonts,
  Roboto_500Medium_Italic,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { AirbnbRating } from "react-native-ratings";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Autocomplete from "react-native-autocomplete-input";
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;
function HotelSearchBar() {
  const [multiSliderValue, setMultiSliderValue] = useState([100000, 1000000]);
  const [cities, setCities] = useState(cityData);
  const [selectedCity, setSelectedCity] = useState();
  const [filteredCity, setFilteredCity] = useState([]);
  function findCity(query) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setFilteredCity(cities.filter((city) => city.search(regex) >= 0));
    } else setFilteredCity([]);
  }

  const multiSliderValueChange = (values) => {
    setMultiSliderValue(values);
  };
  const ratingCompleted = (rating) => {
    console.log(rating);
  };
  let [fontsLoaded] = useFonts({
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/searchImage.png")}
          style={styles.imageBackground}
        />
        <Text style={styles.slogan}>Tìm kiếm khách sạn</Text>
        <Text> Hạng khách sạn</Text>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
          defaultRating={5}
          size={35}
          onFinishRating={(rating) => ratingCompleted(rating)}
        />
        <Text> Giá</Text>
        <View style={{ alignItems: "center" }}>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={300}
            min={100000}
            max={1000000}
            step={100000}
            minMarkerOverlapDistance={10}
            onValuesChange={multiSliderValueChange}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ marginLeft: 20 }}>{multiSliderValue[0]} VND</Text>
          <Text style={{ marginRight: 20 }}>{multiSliderValue[1]} VND</Text>
        </View>
        <Text>Thành phố</Text>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          data={filteredCity}
          defaultValue={selectedCity}
          onChangeText={(text) => findCity(text)}
          placeholder="enter your city"
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCity(item);
                setFilteredCity([]);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTop,
  },
  imageBackground: {
    width: windowWidth,
    height: 250,
  },
  slogan: {
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "Roboto_400Regular_Italic",
    marginTop: 10,
  },
});
const cityData = ["Hà Nội", "Sài Gòn", "Đà Lạt", "Vĩnh Phúc"];
export default HotelSearchBar;
