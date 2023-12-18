//Quản lý trạng thái xác thực người dùng sử dụng Firebase Authentication
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth'; //Hàm này được sử dụng để theo dõi sự thay đổi trong trạng thái xác thực người dùng.
import React from 'react';
// import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, View } from 'react-native';

import { FIRE_BASE_AUTH } from '../firebase/firebaseConfig'; //cấu hình Firebase Authentication, chứa thông tin cần thiết để kết nối ứng dụng của bạn với dịch vụ xác thực Firebase.
// WebBrowser.maybeCompleteAuthSession();

export default function useAuth() {
  const [user, setUser] = React.useState();
  // const [loading, setLoading] = React.useState(false);

  // if (loading)
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  const getLocalUser = async () => {
    try {
      // setLoading(true);
      const userJSON = await AsyncStorage.getItem('@user');
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUser(userData);
    } catch (e) {
      console.log(e, 'Error getting local user');
    } finally {
      // setLoading(false);
    }
  }; //Biến này sẽ chứa thông tin về người dùng hiện tại.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(FIRE_BASE_AUTH, async (user) => {
      if (user) {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        setUser(user);
        console.log('got user:', user);
      } else {
        setUser(null);
        console.log('got user:', user);
      }
    });
    return unsub;
  }, []);
  return { user }; //theo dõi trạng thái xác thực người dùng. Hook này sẽ được chạy sau khi giao diện người dùng đã render ([] là một danh sách rỗng, đảm bảo hook chỉ chạy một lần sau khi giao diện người dùng đã render).
} //theo dõi trạng thái xác thực và cung cấp thông tin về người dùng hiện tại
//Hàm onAuthStateChanged được gọi với tham số là cấu hình xác thực Firebase (FIRE_BASE_AUTH) và một hàm callback. Hàm callback này sẽ được gọi mỗi khi trạng thái xác thực của người dùng thay đổi.
//Trong hàm callback, nếu người dùng đã đăng nhập (user tồn tại), thì setUser được gọi để cập nhật trạng thái user với thông tin người dùng. Nếu người dùng chưa đăng nhập, trạng thái user được đặt thành null.
