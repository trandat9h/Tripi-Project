import React from 'react';
import { StyleSheet, View, Image, Text, Amenities} from 'react-native';
import Constants from 'expo-constants';
const marginTop = Constants.statusBarHeight;
function Amenities() {
    return (
        <View style={styles.container}>
           <Text> Amen</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: marginTop,
    },
   
})

export default Amenities;