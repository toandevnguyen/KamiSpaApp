import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../../screens/GiuaKyKamiSpaScr/HomeScreen';
// import LoginScreen from '../../screens/GiuaKyKamiSpaScr/LoginScreen';
import OptionsScreen from '../../screens/GiuaKyKamiSpaScr/OptionsScreen';
import ServiceDetail from '../../screens/GiuaKyKamiSpaScr/ServiceDetail';

export default function MaterialBottomTab() {
  const getTabBarIcon =
    (icon) =>
    ({ color }) => <MaterialIcons name={icon} size={26} color={color} />;
  const BottomTab = createMaterialBottomTabNavigator();
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      activeColor="rgb(239, 80, 107)"
      inactiveColor="rgb(0, 0, 0)"
      // style={{ backgroundColor: 'tomato' }}
      barStyle={{ backgroundColor: '#ffffff' }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: getTabBarIcon('home'),
          // tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={26} />,
        }}
      />
      <BottomTab.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          tabBarLabel: 'Service Detail',
          tabBarIcon: getTabBarIcon('star'),
          // headerShown: true, //ẩn header của bottom tag
        }}
      />
      <BottomTab.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: getTabBarIcon('settings'),
        }}
      />
    </BottomTab.Navigator>
  );
}
