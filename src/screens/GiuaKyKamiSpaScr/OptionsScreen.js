import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser, signOut } from 'firebase/auth';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
import { Appbar } from 'react-native-paper';

import DetailListItem from '../../components/KamiSpaAppCpn/DetailListItem';
import { FIRE_BASE_AUTH } from '../../firebase/firebaseConfig';
import useAuth from '../../hooks/useAuth'; //hook onAuthStateChanged
// WebBrowser.maybeCompleteAuthSession();
const userProfile = FIRE_BASE_AUTH;
export default function OptionsScreen({ navigation }) {
  const userLoginEmail = useAuth();
  console.log('🚀 ~ file: OptionsScreen.js:13 ~ OptionsScreen ~ userLoginEmail:', userLoginEmail);
  const handleRemoveAcc = async () => {
    try {
      // Lấy người dùng hiện tại
      const user = FIRE_BASE_AUTH.currentUser;

      if (user) {
        // Xóa tài khoản người dùng
        await deleteUser(user)
          .then(() => {
            alert('Tài khoản đã bị xóa.');
          })
          .catch((_error) => {});
        // await user.delete();
        // alert("Tài khoản" + { user } + "đã bị xóa."),
      } else {
        console.log('Không có người dùng đăng nhập.');
      }
    } catch (error) {
      console.error('Lỗi xóa tài khoản:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar style={{ width: '100%', backgroundColor: 'rgb(239, 80, 107)' }}>
        <Appbar.Content title={userProfile?.currentUser?.displayName} color="rgb(255, 255, 255)" />
      </Appbar>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />

      <TouchableOpacity onPress={handleRemoveAcc}>
        <DetailListItem title="Remove Account" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('@user');
          // await AsyncStorage.clear;
          await signOut(FIRE_BASE_AUTH);
          console.log('after signOut userLoginEmail:', FIRE_BASE_AUTH);

          // navigation.navigate('HomeScreen');
        }}>
        <DetailListItem title="Sign Out" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
