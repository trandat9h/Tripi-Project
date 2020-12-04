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
import {AntDesign} from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;
function HotelSearchBar() {
  let tagRef = useRef();
  const navigation = useNavigation();
  const [ranking, setRanking] = useState(-1);
  const [multiSliderValue, setMultiSliderValue] = useState([100000, 10000000]);
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
      hotelCountResult: 10,
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
        <Text style={styles.slogan}>Bộ lọc</Text>
        <Text style={styles.topic}>Thành phố</Text>
        <Autocomplete
          style={{borderColor:"green",borderWidth: 1.5, padding: 10,borderRadius: 10,width: 350,marginLeft: -1, marginBottom: -1}}
          inputContainerStyle={{borderRadius: 10,width: 350,marginLeft: 30,borderColor:"#EFEFEF"}}
          containerStyle={styles.autoCompleteInput}
          listContainerStyle={{width: 350,marginLeft: 30,marginTop: 5,borderRadius: 10,backgroundColor:"white"}}
          autoCapitalize="none"
          autoCorrect={false}
          data={filteredCity}
          defaultValue={selectedCity}
          onChangeText={(text) => findCity(text)}
          placeholder="Thành phố bạn muốn du lịch"
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCity(item);
                setFilteredCity([]);
              }}
              style={{height:40, paddingTop: 10,}}
            >
              <Text style={{ fontSize: 16 }}>  {item}</Text>
              {/* <View style={{height: 1, backgroundColor:"grey", marginTop: 5,}}>

              </View> */}
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={{ height: 50 }} />
        <Text style={styles.topic}> Hạng khách sạn</Text>
        <AirbnbRating
          showRating={false}
          count={5}
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
        <NumberFormat
            value={multiSliderValue[0]}
            thousandSeparator={true}
            displayType={"text"}
            renderText={(value) => (
              <Text style={{marginLeft: 20,}}>
                {value} Đ
              </Text>
            )}
          />
          <NumberFormat
            value={multiSliderValue[1]}
            thousandSeparator={true}
            displayType={"text"}
            renderText={(value) => (
              <Text style={{marginRight: 20,}}>
                {value} Đ
              </Text>
            )}
          />
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
    backgroundColor:"#EFEFEF",
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
    marginBottom: 20,
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
    left: 0,
    position: "absolute",
    top: 110,
    right: 0,
    zIndex: 1,
    borderRadius: 30,
  },
  tagItem:{
    marginLeft: 20,
    borderColor: 'grey',
    borderWidth: 1,
  }
});
const tagData = [
  { id: 1, label: "Bể bơi" },
  { id: 2, label: "Đưa đón sân bay" },
  { id: 3, label: "Nhà hàng" },
  { id: 4, label: "Dịch vụ trông trẻ" },
  { id: 5, label: "Dịch vụ giặt ủi" },
  { id: 6, label: "Quán Bar" },
  { id: 7, label: "Phòng xông hơi" },
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
