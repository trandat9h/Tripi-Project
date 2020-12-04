import React, {useState, useEffect} from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import { Bar } from "react-native-progress";
import axios from "axios";
import {
    Roboto_400Regular_Italic,
    useFonts,
    Roboto_500Medium_Italic
  } from "@expo-google-fonts/roboto";
  import { AppLoading } from "expo";

function FeedbackOverview({ id }) {
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});


  const getReview = () => {
    axios
      .post("https://9c3caf23bf5f.ngrok.io/reviews", { 'id': `${id}` })
      .then((res) => {
        //console.log(res.data);
        setReviewData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err+'review');
      });
  };
  useEffect(() => {
    getReview();
  }, []);

  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic, Roboto_500Medium_Italic });
  if (!fontsLoaded || loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.overview}>
          <Text style={styles.overviewText}> {reviewData[0].score_mean}/4</Text>
          <Text style={styles.reviewNo}> {reviewData[0].number} đánh giá</Text>
        </View>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ marginVertical: 3, fontSize: 14, fontFamily:'Roboto_500Medium_Italic' }}>Tuyệt vời</Text>
          <Bar
            color='#2ab00c'
            progress={0.6}
            height={10}
            borderColor="#5AA469"
            width={200}
            borderRadius={5}
          />
          <Text style={{ marginVertical: 3, fontSize: 14, fontFamily:'Roboto_500Medium_Italic' }}> Tốt</Text>
          <Bar
            color='#FCA652'
            progress={0.3}
            height={10}
            borderColor="#5AA469"
            width={200}
            borderRadius={5}
          />
          <Text style={{ marginVertical: 3, fontSize: 14, fontFamily:'Roboto_500Medium_Italic' }}>Chấp nhận được</Text>
          <Bar
            color='#FF414D'
            progress={0.1}
            height={10}
            borderColor="#5AA469"
            width={200}
            borderRadius={5}
          />
        </View>
      </View>
    );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  overview: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "column",
  },
  overviewText: {
    position: "absolute",
    top: 30,
    fontSize: 23,
    fontWeight: "bold",
    left: 20,
  },
  reviewNo: {
    position: "absolute",
    top: 70,
    left: 15,
  },
});

const emotion = [
  {
    emotion: "Tuyệt vời",
  },
];
export default FeedbackOverview;
