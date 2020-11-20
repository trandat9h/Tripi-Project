import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, } from "react-native";
import Constants from "expo-constants";
import {
  Roboto_400Regular_Italic,
  useFonts,
  Roboto_500Medium_Italic,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { AirbnbRating } from "react-native-ratings";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get("window").width;
function HotelSearchBar() {
  const multiSliderValueChange= (values) => {
      setMultiSliderValue(values)

  }
  const ratingCompleted  = (rating) => {
      console.log(rating);
  };
  const [multiSliderValue, setMultiSliderValue] = useState([0,10]);
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
          onFinishRating = {(rating) => ratingCompleted(rating)}
          
        />
        <Text> Giá</Text>
        <View style={{alignItems:'center'}}>

        <MultiSlider
        values={[multiSliderValue[0],multiSliderValue[1]]}
        sliderLength={300}
        min={0}
        max={10}
        allowOverlap
        onValuesChange={multiSliderValueChange} />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{marginLeft: 20,}}>
                {multiSliderValue[0]} VND
            </Text>
            <Text style={{marginRight: 20,}}>
                {multiSliderValue[1]} VND
            </Text>
        </View>
        <Text>
            Dịch vụ
        </Text>
            

      
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

export default HotelSearchBar;
