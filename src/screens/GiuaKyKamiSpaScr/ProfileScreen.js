import React from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet, StatusBar } from 'react-native';
import { Appbar, TextInput, Button, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import ServiceItemDetail from '../../components/KamiSpaAppCpn/ServiceItemDetail';
import { firebase, FIRE_BASE_AUTH } from '../../firebase/firebaseConfig';
import UserItemDetail from '../../components/KamiSpaAppCpn/UserItemDetail';
import useAuth from '../../hooks/useAuth';
// const userProfile = FIRE_BASE_AUTH;
export default function ProfileScreen() {
  const userProfile = useAuth()?.user;

  const ref = firebase.firestore().collection('KamiSpaApp-Users'); //create a reference to the collection, which can be used throughout our component to query it.

  const [loading, setLoading] = React.useState(true); //We need a loading state to indicate to the user that the first connection (and initial data read) to Cloud Firestore has not yet completed.
  const [user, setUser] = React.useState([]); //manng luu nhieu cong viec

  return (
    <View style={styles.container}>
      <StatusBar />

      <Appbar style={{ width: '100%', backgroundColor: 'rgb(239, 80, 107)' }}>
        <Appbar.Content title={userProfile?.email} color="rgb(255, 255, 255)" />
        {/* <Appbar.Content title={userProfile?.currentUser?.displayName} color="rgb(255, 255, 255)" /> */}
      </Appbar>
      <Text style={styles.txtHeader}>Thông tin cá nhân</Text>

      <Avatar.Text size={100} label={userProfile?.email.split('')[0]} />
      <Text style={styles.infoUser}>Email: {userProfile?.email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'rgb(88, 210, 123)',
  },
  txtHeader: {
    marginVertical: 10,
    color: 'rgb(239, 80, 107)',
    fontWeight: 'bold',
    fontSize: 27,
    // justifyContent:'space-around'
  },
  groupTxtTitle: {
    // flexWrap:'wrap'
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    // alignContent: 'space-between',

    // backgroundColor: 'rgb(48, 98, 248)',
    // marginHorizontal,
  },
  txtTitle: {
    // backgroundColor: 'rgb(239, 80, 107)',

    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    fontSize: 20,
    // alignSelf: '',
  },
  Button: {
    // marginVertical: 20,
    // margin: 10,
    // alignSelf: 'flex-end',

    backgroundColor: 'rgb(239, 80, 107)',
    // borderRadius: 100,
  },
  FlatList: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'rgb(201, 237, 40)',
  },
  TextInput: {
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
});
