import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Roboto_400Regular_Italic, useFonts } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import Star from "react-native-star-view";
import { useNavigation } from "@react-navigation/native";
import NumberFormat from "react-number-format";
import { Buffer } from "buffer";
import axios from "axios";
import { useEffect } from "react";
function HotelCard_v2({ hotel }) {
  const newHotel = hotel;
  const [price, setPrice] = useState(Math.round(hotel.price));
  const token = Buffer.from(`O_VN:pf6zLZs5bOMnpQ8aMk4x`, "utf8").toString(
    "base64"
  );
  const callPrice = () => {
    axios
      .post(
        "https://tripgle.data.tripi.vn/get_price",
        { hotel_ids: `${hotel.domain_id}_${hotel.domain_hotel_id}_20201124` },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((res) => {
        setPrice(res.data[0][0].final_amount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callPrice();
  }, []);
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({ Roboto_400Regular_Italic });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("HotelDetail", { hotel: hotel })}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: hotel.images[0] }} />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {hotel.name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="location"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ width: 221 }} numberOfLines={2}>
                {hotel.location}
              </Text>
            </View>
            <NumberFormat
              value={price}
              thousandSeparator={true}
              displayType={"text"}
              renderText={(value) => (
                <Text style={styles.price}>Giá : {value} VND</Text>
              )}
            />
            <Star score={hotel.rating} style={styles.starRating} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

export default HotelCard_v2;
