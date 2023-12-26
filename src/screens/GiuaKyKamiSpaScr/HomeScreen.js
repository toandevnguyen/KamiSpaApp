import React from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet, StatusBar } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../../hooks/useAuth'; //hook onAuthStateChanged

import RNE_SpeedDialCPN from '../../components/KamiSpaAppCpn/RNE_SpeedDialCPN';
import ServiceItemList from '../../components/KamiSpaAppCpn/ServiceItemList';
import { firebase, FIRE_BASE_AUTH } from '../../firebase/firebaseConfig';

const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = today.getMonth() + 1;
const year = today.getFullYear();
const hour = today.getHours().toString().padStart(2, '0');
const minute = today.getMinutes().toString().padStart(2, '0');
const second = today.getSeconds().toString().padStart(2, '0');

export default function HomeScreen() {
  const userProfile = useAuth()?.user?.email;
  console.log("🚀 ~ file: HomeScreen.js:22 ~ HomeScreen ~ userProfile:", userProfile)

  // const refUsers = firebase.firestore().collection('KamiSpaApp-Users').doc(userProfile); //create a reference to the collection, which can be used throughout our component to query it.

  const refServicesDetail = firebase.firestore().collection('KamiSpaApp-ServicesDetail'); //create a reference to the collection, which can be used throughout our component to query it.
  const [txtInputServiceName, setTxtInputServiceName] = React.useState(''); //use the useState hook here, and update state every time the text changes via the onChangeText prop from the TextInput component.

  const [loading, setLoading] = React.useState(true); //We need a loading state to indicate to the user that the first connection (and initial data read) to Cloud Firestore has not yet completed.
  const [services, setServices] = React.useState([]); //manng luu nhieu cong viec

  //TODO:chức năng Search
  const [searchResults, setSearchResults] = React.useState([]);
  const searchService = (query) => {
    const results = services.filter((service) => {
      return service.ServiceName.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
    
  };


  //Đây là một hook trong React, cho phép bạn thực hiện các hiệu ứng phụ sau khi render.
  React.useEffect(() => {
    //Đây là hàm callback được gọi sau khi component render. Nó sẽ thiết lập một lắng nghe sự kiện từ Firestore.
    //Sử dụng phương thức onSnapshot của Firestore để lắng nghe thay đổi dữ liệu (thêm, xóa, cập nhật).
    //ref.onSnapshot((querySnapshot) => { ... }): Phương thức onSnapshot của Firestore cho phép bạn lắng nghe sự thay đổi dữ liệu từ Firestore. Khi có sự thay đổi, nó sẽ gọi hàm callback với querySnapshot là đối tượng chứa dữ liệu mới.
    return refServicesDetail.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { ServiceName, price, image, Creator, Time, FinalUpdate } = doc.data();
        list.push({
          id: doc.id,
          ServiceName,
          price,
          image,
          Creator,
          Time,
          FinalUpdate,
        });
      });

      setServices(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  // ...

  //TODO: fix giỏ hàng
  // async function addService() {
  //   // Kiểm tra xem ServiceName có tồn tại trong Firestore hay không
  //   const serviceExists = await firebase
  //     .firestore()
  //     .collection('KamiSpa-db')
  //     .where('ServiceName', '==', txtInputServiceName)
  //     .get();

  //   // Nếu ServiceName đã tồn tại, thông báo cho người dùng và không thêm mới
  //   if (!serviceExists.empty || !txtInputServiceName.trim()) {
  //     alert('Chưa nhập ServiceName hoặc ServiceName đã tồn tại!');
  //     return;
  //   }
  //   await ref.add({
  //     ServiceName: txtInputServiceName,
  //     price: 1,
  //     Creator: 'Admin Toan',
  //     Time: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
  //     FinalUpdate: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
  //   });

  //   // Đặt giá trị của biến todo thành chuỗi rỗng.
  //   setTxtInputServiceName('');
  // }

  // if (loading) {
  //   return null; // or a spinner
  // }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Appbar style={{ width: '100%', backgroundColor: 'rgb(239, 80, 107)' }}>
        <Appbar.Content title={userProfile} color="rgb(255, 255, 255)" />
      </Appbar>
      <Text style={styles.txtHeader}>KAMI SPA Dev</Text>
      <View style={styles.groupTxtTitle}>
        <Text style={styles.txtTitle}>Danh sách dịch vụ</Text>
        <Icon.Button
          name="cart-arrow-right"
          color="rgb(239, 80, 107)"
          backgroundColor="#ffffff00"
          size={24}
          // onPress={addService}
        />
      </View>

      <FlatList
        style={styles.FlatList}
        data={searchResults.length > 0 ? searchResults : services}
        // data={services}
        keyExtractor={(item) => item.id} //id cua todo sẽ được truyền vào làm id cho mỗi item trong FlatList
        renderItem={({ item }) => {
          // console.log('Item ID:', item.id);
          return (
            // Log ID của mỗi item trong danh sách
            <ServiceItemList item={item} />
          );
        }} //~ <ServiceItemList id={1} ServiceName="Lot mun" price={1}/>
      />
      <TextInput
        textColor="rgb(0, 0, 0)"
        outlineColor="rgb(239, 80, 107)"
        activeOutlineColor="rgb(239, 80, 107)"
        mode="outlined"
        style={styles.textInput}
        label="Tìm kiếm"
        value={txtInputServiceName}
        // onChangeText={setTxtInputServiceName}
        onChangeText={(query) => {
          setTxtInputServiceName(query);
          searchService(query);
        }}
      />
      {userProfile === 'admin1@gmail.com' ? <RNE_SpeedDialCPN /> : null}
      {/* {getInfoUserLogin() == true ? <RNE_SpeedDialCPN /> : null} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgb(88, 210, 123)',
  },
  txtHeader: {
    marginVertical: 10,
    color: 'rgb(239, 80, 107)',
    fontWeight: 'bold',
    fontSize: 27,
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
  grTxtInput: {
    flexDirection: 'row',
    margin: 5,
  },
  textInput: {
    margin: 10,
    width: '95%',
    backgroundColor: 'rgb(255, 255, 255)',
    // borderColor: 'rgb(0, 0, 0)',
  },
});
