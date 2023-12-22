import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button, TextInput, Avatar, HelperText } from 'react-native-paper';

import { firebase, FIRE_BASE_AUTH } from '../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../hooks/useAuth';

// import { FIRE_BASE_AUTH } from "../../firebase/firebaseConfig";

export default function SignUpScreen({ navigation }) {
  const userLoginEmail = useAuth();

  const [textUserName, setTextUserName] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [isFocusTxtInput, setIsFocusTxtInput] = React.useState(false);

  const validateEmail = (textUserName) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,3}))$/; //gg bard
    // const reg = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/; //Bing
    // var reg = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/;//chatGPT
    return reg.test(textUserName);
  };

  const hasErrorsEmail = () => {
    return !validateEmail(textUserName);
  };

  const hasErrorsPassword = () => {
    return textPassword.length < 8;
  };

  const hasErrorConfirmPassword = () => {
    if (textPassword === '') return true;
    else {
      if (textPassword != confirmPassword) return true;
    }
  };

  async function handleSignOut() {
    try {
      alert(
        'Tài khoản: ' + `${textUserName}` + ' đã được tạo thành công.\n Vui lòng đăng nhập lại!'
      );
      await AsyncStorage.removeItem('@user');
      // await AsyncStorage.clear;
      await signOut(FIRE_BASE_AUTH);
    } catch {
      console.log('Không có người dùng đăng nhập!');
    }
  }

  //Hàm async thường được sử dụng để xử lý các tác vụ bất đồng bộ như fetch dữ liệu từ mạng, gọi API
  const handleSubmit = async () => {
    if (textUserName && textPassword && confirmPassword) {
      setLoadingButton(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          FIRE_BASE_AUTH,
          textUserName,
          textPassword
        );
        // Lấy thông tin người dùng hiện tại
        const currentUser = userCredential?.user;
        const emailCurrentUser = currentUser?.email;
        const displayNameCurrentUser = currentUser?.displayName;
        const AvatarCurrentUser = currentUser?.photoURL;

        // Dữ liệu để lưu
        const userData = {
          email: emailCurrentUser,
          role: 'customer',
          // displayName: displayNameCurrentUser,
          // avatar: AvatarCurrentUser,
        };

        // Lưu thông tin người dùng vào Firestore
        await firebase.firestore().collection('KamiSpaApp-Users').doc(userData.email).set(userData).then(
          // alert('Đã lưu thông tin '+`${emailCurrentUser}`+ 'vào FireStore')
          );
        handleSignOut();
      } catch (error) {
        alert(
          'Tài khoản: ' +
            `${textUserName}` +
            ' đã được tồn tại.\n Vui lòng nhập địa chỉ gmail khác!'
        );
        setConfirmPassword('');
        setLoadingButton(false);
        setTextPassword('');
        setTextUserName('');
        // console.log('got error: ', error.message);
      }
      // await handleSignOut();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>Đăng ký tài khoản</Text>
      <View style={styles.groupTxtInput}>
        <TextInput
          style={styles.txtInput}
          mode="outlined"
          activeOutlineColor={hasErrorsEmail() ? 'rgb(255, 43, 43)' : 'rgb(61, 243, 25)'}
          outlineColor={
            !isFocusTxtInput
              ? 'rgb(0, 0, 0)'
              : hasErrorsEmail()
              ? 'rgb(255, 43, 43)'
              : 'rgb(61, 243, 25)'
          }
          label="Email"
          textColor="rgb(0, 0, 0)"
          // labelStyle={{color:"black"}}
          placeholder="vd: abc@gmail.com"
          placeholderTextColor="rgb(149, 145, 145)"
          value={textUserName}
          onChangeText={(textUserName) => setTextUserName(textUserName)}
          left={<TextInput.Icon icon="email" size={20} color="rgb(0, 0, 0)" />}
          right={<TextInput.Affix text=" 0/16" />}
          keyboardType="email-address"
        />
        {isFocusTxtInput ? (
          hasErrorsEmail() ? (
            <HelperText type="error" visible={true}>
              Sai định dạng Email!
            </HelperText>
          ) : (
            <HelperText style={{ color: 'rgb(61, 243, 25)' }} type="error" visible={true}>
              Thông tin hợp lệ.
            </HelperText>
          )
        ) : null}
        <TextInput
          style={styles.txtInput}
          activeOutlineColor={hasErrorsPassword() ? 'rgb(255, 43, 43)' : 'rgb(61, 243, 25)'}
          mode="outlined"
          secureTextEntry
          onFocus={() => setIsFocusTxtInput(true)}
          left={<TextInput.Icon icon="shield-key" size={20} color="rgb(0, 0, 0)" />}
          outlineColor={
            !isFocusTxtInput
              ? 'rgb(0, 0, 0)'
              : hasErrorsPassword()
              ? 'rgb(255, 43, 43)'
              : 'rgb(61, 243, 25)'
          }
          placeholder="*******"
          maxLength={8}
          textColor="rgb(0, 0, 0)"
          // passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; maxlength: 8;"

          //right={<TextInput.Icon icon="eye" />}
          placeholderTextColor="rgb(149, 145, 145)"
          label="Mật khẩu"
          value={textPassword}
          onChangeText={(textPassword) => setTextPassword(textPassword)}
        />
        {isFocusTxtInput ? (
          hasErrorsPassword() ? (
            <HelperText type="error" visible={true}>
              Mật khẩu phải ít nhất 8 ký tự!
            </HelperText>
          ) : (
            <HelperText style={{ color: 'rgb(61, 243, 25)' }} type="error" visible={true}>
              Đã đủ 8 ký tự.
            </HelperText>
          )
        ) : null}
        <TextInput
          style={styles.txtInput}
          activeOutlineColor={hasErrorConfirmPassword() ? 'rgb(255, 43, 43)' : 'rgb(61, 243, 25)'}
          mode="outlined"
          secureTextEntry
          onFocus={() => setIsFocusTxtInput(true)}
          left={<TextInput.Icon icon="shield-key" size={20} color="rgb(0, 0, 0)" />}
          outlineColor={
            !isFocusTxtInput
              ? 'rgb(0, 0, 0)'
              : hasErrorConfirmPassword()
              ? 'rgb(255, 43, 43)'
              : 'rgb(61, 243, 25)'
          }
          placeholder="*******"
          maxLength={8}
          textColor="rgb(0, 0, 0)"
          // passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; maxlength: 8;"

          //right={<TextInput.Icon icon="eye" />}
          placeholderTextColor="rgb(149, 145, 145)"
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
        {isFocusTxtInput ? (
          hasErrorConfirmPassword() ? (
            <HelperText type="error" visible={true}>
              Mật khẩu nhập lại không khớp!
            </HelperText>
          ) : (
            <HelperText style={{ color: 'rgb(61, 243, 25)' }} type="error" visible={true}>
              Thông tin hợp lệ.
            </HelperText>
          )
        ) : null}
      </View>
      <Button
        style={styles.btnLogin}
        disabled={!!hasErrorsEmail()}
        mode="outlined"
        textColor="rgb(255, 255, 255)"
        loading={loadingButton}
        icon={loadingButton ? null : 'login'}
        onPress={handleSubmit}>
        Đăng ký
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    //backgroundColor: "#000",
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',

    marginBottom: 40,

    // flex: 1,

    //backgroundColor: "#000",
  },

  //
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  txtHeader: {
    marginVertical: 10,
    color: 'rgb(239, 80, 107)',
    fontWeight: 'bold',
    fontSize: 27,
  },

  groupTxtInput: {
    // backgroundColor: "#ce33d6",
    // top: 250,
    // bottom: 120,
    margin: 10,
  },

  txtInput: {
    marginVertical: 5,
    // color: "white",

    width: 280,
    backgroundColor: 'rgb(255, 255, 255)',
  },

  txtForgetPassWord: {
    // flexDirection: "row",
    // position: "relative",
    // start: 60,
    // backgroundColor: "#ce33d6",
    bottom: 110,
    // top: 425,
    color: 'blue',
  },

  btnLogin: {
    width: 250,

    backgroundColor: 'rgb(239, 80, 107)',
    borderRadius: 5,
    // position: "relative",
    // bottom: 100,
    // top: 450,
    // backgroundColor: "#000",
  },

  txtSignUp: {
    flexDirection: 'row',
    // position: "relative",
    // start: 90,
    // backgroundColor: "#ce33d6",
    bottom: 90,
    marginVertical: 5,
    // top: 500,
  },

  btnSocialAuth: {
    bottom: 80,
    marginVertical: 5,
  },
});
