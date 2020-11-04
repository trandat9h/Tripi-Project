import React from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';
import { Entypo, AntDesign} from '@expo/vector-icons';

function HotelCard_v2({hotel}) {
    return (
        <View style={styles.container}>
           <Image style={styles.image} source={require('../assets/hotel.jpg')} />
           <View style={styles.info}>
               <Text style={styles.name}>{hotel.name}</Text>
               <View style={{flexDirection:'row'}}>
               <Entypo name="location" size={20} color="red" style={{marginRight: 5,}} />
               <Text>{hotel.location} </Text>
               </View>
               <View style={{flexDirection:'row', alignItems:"center"}}>
                   <Text>{hotel.rating}</Text>
                   <AntDesign name="star" size={24} color="yellow" style={{marginLeft: 5,}} />
               </View>
               <Text style={styles.price}>
                   {hotel.price}$
               </Text>

           </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:"aqua",
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 9,
    },
    price:{
        fontWeight:"bold",
        fontSize: 20,
    }

})

export default HotelCard_v2;