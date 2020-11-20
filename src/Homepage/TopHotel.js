import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { Foundation } from '@expo/vector-icons';
import HotelCard_v3 from '../HotelCard_v3';

const cities = ["Hà Nội", "Đà Nẵng", "TP.HCM"];
const TopHotel = ({ hotels }) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hotels.map((hotel, index) => {
          return (
            <HotelCard_v3 hotel={hotel} city={cities[index]} key={index} />
          );
        })}
      </ScrollView>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height:350,
  },
});

export default TopHotel;
