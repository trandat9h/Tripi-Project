import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { Roboto_400Regular_Italic, useFonts, Roboto_500Medium_Italic } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;
function HotelSearchBar() {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular_Italic,
        Roboto_500Medium_Italic,
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (
        <View style={styles.container}>
           <Image  source={require("../assets/searchImage.png")} style={styles.imageBackground}/>
           <Text style={styles.slogan}>
               Tìm kiếm khách sạn
           </Text>

        </View>
    )}
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
        alignSelf:"center",
        fontSize: 20,
        fontFamily:"Roboto_400Regular_Italic",
        marginTop: 10,
    }

})

export default HotelSearchBar;