import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
// import { FIRE_BASE_AUTH } from "../../firebase/firebaseConfig";

export default function WelcomeScreen({ navigation }) {
  // const image = require('../../../assets/react_native_logo.gif') ;
  const imgBg = require('../../../assets/gif/quby_line_hi.gif');

  return (
    <View style={styles.container}>
      <ImageBackground source={imgBg} resizeMode="contain" style={styles.imgbg}>
        <Avatar.Image
          style={styles.avtImg}
          size={100}
          source={require('../../../assets/AvtTonDev.png')}
        />
        <Text style={styles.title}>Welcome To My App!</Text>

        <View style={styles.groupButton}>
          <Button
            style={{ marginEnd: 5 }}
            icon="account-plus-outline"
            mode="contained-tonal"
            onPress={() => {
              // alert(
              //   "Xin chao " + textUserName + "\n" + "Password: " + textPassword
              // );
              navigation.navigate('SignUpScreen');
            }}>
            Sign Up
          </Button>

          <Button
            style={{ marginStart: 5 }}
            icon="account-arrow-right"
            mode="contained-tonal"
            onPress={() => {
              // alert(
              //   "Xin chao " + textUserName + "\n" + "Password: " + textPassword
              // );
              navigation.navigate('LoginScreen');
            }}>
            Login
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },

  imgbg: {
    //backgroundColor: "#000",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  avtImg: {
    position: 'absolute',
    marginTop: 30,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginTop: 135,
    //backgroundColor: "#000",
  },

  groupButton: {
    flexDirection: 'row',
    padding: 50,
    // backgroundColor: "#ce33d6",
  },
});
