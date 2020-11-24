import React, { useState, useEffect } from "react";
import {AntDesign} from '@expo/vector-icons';
import Constants from "expo-constants";
import { AppLoading } from "expo";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { Roboto_900Black, useFonts } from "@expo-google-fonts/roboto";
import axios from "axios";
const marginTop = Constants.statusBarHeight;
function Reviews({ route, navigation }) {
  const { reviews } = route.params;
  let [fontsLoaded] = useFonts({ Roboto_900Black });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.slogan}>Đánh giá</Text>
        <ScrollView>
          {reviews.map((review, index) => {
            return (
              <View style={styles.commentWrapper} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/user.png")}
                    style={styles.logo}
                  />
                  <Text style={styles.user}> {review.user}</Text>
                </View>
                <Text style={styles.detail}>{review.detail}</Text>
              </View>
            );
          })}
        </ScrollView>
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
    marginBottom:10,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 10,
  },
  commentWrapper: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
  },
  user: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  detail: {
      marginLeft: 10,
      fontSize: 14, 
  }
});

export default Reviews;
