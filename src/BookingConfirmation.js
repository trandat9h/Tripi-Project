import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import {AntDesign} from '@expo/vector-icons';
const marginTop = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;
function BookingConfirmation({navigation}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => navigation.goBack()} style={{zIndex: 2,alignItems:'center',justifyContent:'center', position: "absolute", top: 20, left: 20, backgroundColor:'white', height: 36,width: 36, borderRadius: 18, }} >
      <AntDesign name="arrowleft" size={27} color="black" />
      </TouchableOpacity>
          <Image source={require('../assets/app-background.jpg')} style={styles.background}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: marginTop,
    },
    background: {
        width:windowWidth,
        height: 300,
    }
    
})

export default BookingConfirmation;