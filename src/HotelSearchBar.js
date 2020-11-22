import React, { useRef, useState } from "react";
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
  Roboto_900Black,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { AirbnbRating } from "react-native-ratings";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Autocomplete from "react-native-autocomplete-input";
import { useNavigation } from "@react-navigation/native";
import {TagSelect} from 'react-native-tag-select';
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;
function HotelSearchBar() {
  let tagRef = useRef();
  const navigation = useNavigation();
  const [ranking, setRanking] = useState(-1);
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
  function ratingCompleted (rating) {
    setRanking(rating);
  }
  function getData () {
    const serviceFilterArray = [0,0,0,0,0,0,0];
    const selectedService = tagRef.current.itemsSelected;
    //console.log(selectedService);
    for(let service of selectedService)
       serviceFilterArray[service.id] = 1;
    return ({
      cityFilter: selectedCity,
      minPriceFilter: multiSliderValue[0],
      maxPriceFilter: multiSliderValue[1],
      star: ranking,
      serviceFilter: serviceFilterArray,
    })
  
  }
  let [fontsLoaded] = useFonts({
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
    Roboto_900Black,
    Roboto_700Bold,
    Roboto_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.slogan}>Bộ lọc</Text>
        <Text style={styles.topic}>Thành phố</Text>
        <Autocomplete
          containerStyle={styles.autoCompleteInput}
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
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={{ height: 50 }} />
        <Text style={styles.topic}> Hạng khách sạn</Text>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
          defaultRating={5}
          size={28}
          onFinishRating={(rating) => ratingCompleted(rating)}
        />
        <Text style={styles.topic}> Giá</Text>
        <View style={{ alignItems: "center" }}>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={300}
            min={0}
            max={10000000}
            step={100000}
            minMarkerOverlapDistance={10}
            onValuesChange={multiSliderValueChange}
            touchDimensions={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ marginLeft: 20, fontFamily: "Roboto_400Regular" }}>
            {multiSliderValue[0]} Đ
          </Text>
          <Text style={{ marginRight: 20, fontFamily: "Roboto_400Regular" }}>
            {multiSliderValue[1]} Đ
          </Text>
        </View>
        <Text style={styles.topic}> Dịch vụ</Text>
        <TagSelect
          data={tagData}
          ref={tagRef}
          itemStyle={styles.tagItem}
        />
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            const data = getData();
            navigation.navigate("HotelResult", {filterData: data});
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
            Lọc
          </Text>
        </TouchableOpacity>
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
    fontSize: 23,
    fontFamily: "Roboto_900Black",
    marginTop: 20,
  },
  topic: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Roboto_700Bold",
    marginLeft: 20,
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
  autoCompleteInput: {
    flex: 1,
    left: 0,
    position: "absolute",
    top: 100,
    right: 0,
    zIndex: 1,
  },
  tagItem:{
    marginLeft: 20,
    borderColor: 'grey',
    borderWidth: 1,
  }
});
const tagData = [
  { id: 1, label: "Money" },
  { id: 2, label: "Credit card" },
  { id: 3, label: "Debit card" },
  { id: 4, label: "Online payment" },
  { id: 5, label: "Bitcoin" },
];
const cityData = [
  "Thừa Thiên - Huế",
  "Kiên Giang",
  "Hải Phòng",
  "Gia Lai",
  "Bình Định",
  "An Giang",
  "Nghệ An",
  "Hưng Yên",
  "Bắc Kạn",
  "Quảng Ninh",
  "Hà Nội",
  "Quảng Bình",
  "Quảng Ngãi",
  "Bến Tre",
  "Bà Rịa - Vũng Tàu",
  "Thanh Hóa",
  "Ninh Thuận",
  "Bạc Liêu",
  "Cao Bằng",
  "Lâm Đồng",
  "Lào Cai",
  "Bình Dương",
  "Bình Thuận",
  "Bắc Giang",
  "Hà Giang",
  "Bắc Ninh",
  "Lạng Sơn",
  "Quảng Nam",
  "Sơn La",
  "Tây Ninh",
  "Long An",
  "Đồng Nai",
  "Hồ Chí Minh",
  "Hải Dương",
  "Bình Phước",
  "Hà Nam",
  "Vĩnh Long",
  "Cần Thơ",
  "Vĩnh Phúc",
  "Đắk Lắk",
  "Cà Mau",
  "Tiền Giang",
  "Khánh Hòa",
  "Quảng Trị",
  "Hà Tĩnh",
  "Trà Vinh",
  "Đồng Tháp",
  "Hòa Bình",
  "Phú Thọ",
  "Đà Nẵng",
  "Hậu Giang",
  "Sóc Trăng",
  "Tuyên Quang",
  "Đắk Nông",
  "Thái Nguyên",
  "Kon Tum",
  "Điện Biên",
  "Phú Yên",
  "Thái Bình",
  "Ninh Bình",
  "Nam Định",
  "Lai Châu",
  "Yên Bái",
];
export default HotelSearchBar;
