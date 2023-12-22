import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../../screens/GiuaKyKamiSpaScr/HomeScreen';
// import LoginScreen from '../../screens/GiuaKyKamiSpaScr/LoginScreen';
import OptionsScreen from '../../screens/GiuaKyKamiSpaScr/OptionsScreen';
import ServiceDetail from '../../screens/GiuaKyKamiSpaScr/ServiceDetail';
import UsersDetail from '../../screens/GiuaKyKamiSpaScr/UsersDetail';
import ProfileScreen from '../../screens/GiuaKyKamiSpaScr/ProfileScreen';
import { firebase } from '../../firebase/firebaseConfig';
import useAuth from '../../hooks/useAuth';

function MaterialBottomTab() {
  const userProfile = useAuth()?.user?.email;
  const [role, setRole] = React.useState('');

  const refKamiSpaAppUsers = firebase.firestore().collection('KamiSpaApp-Users').doc(userProfile);
  const [email, setEmail] = React.useState('');
  console.log('🚀 ~ file: MaterialBottomTab.js:50 ~ isAdmin ~ role:', role);
  const getDocUserFireStore = refKamiSpaAppUsers
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        setEmail(doc.data().email);
        setRole(doc.data().role);
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });

  // if (role == 'admin') {
  //   return true;
  // } else return false;

  const getTabBarIcon =
    (icon) =>
    ({ color }) =>
      <MaterialIcons name={icon} size={26} color={color} />;
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
          tabBarIcon: getTabBarIcon('format-list-numbered'),
          // headerShown: true, //ẩn header của bottom tag
        }}
      />

      {role == 'admin' ? (
        <BottomTab.Screen
          name="UsersDetail"
          component={UsersDetail}
          options={{
            tabBarLabel: 'Users Detail',
            tabBarIcon: getTabBarIcon('people'),
            // headerShown: true, //ẩn header của bottom tag
          }}
        />
      ) : (
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'ProfileScreen',
            tabBarIcon: getTabBarIcon('person-pin'),
            // headerShown: true, //ẩn header của bottom tag
          }}
        />
      )}

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
export default React.memo(MaterialBottomTab);
