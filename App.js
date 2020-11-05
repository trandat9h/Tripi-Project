import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

import Homepage from './src/Homepage/Homepage';
import History from './src/History/History';
import Notifications from './src/Notifications/Notifications';
import Setting from './src/Setting/Setting';

const Tab = createBottomTabNavigator();

const routeIcons = {
  Homepage:"home" ,
  History: "hearto",
  Notifications: "notification",
  Setting: "setting",
};
const getTabBarVisibility =(route) => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '';
  if (routeName === 'HotelDetail' || routeName ==='SearchResult' || routeName ==='BookingConfirmation') {
    return false;
  }
  return true;
}
export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={routeIcons[route.name]}
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        })}>
          <Tab.Screen name="Homepage" component={Homepage} options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route)
          })} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Notifications" component={Notifications} />
          <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
      </NavigationContainer>
      
  );
}
