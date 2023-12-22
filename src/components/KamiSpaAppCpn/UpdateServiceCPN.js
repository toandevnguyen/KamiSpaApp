import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { firebase } from '../../firebase/firebaseConfig';
const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = today.getMonth() + 1;
const year = today.getFullYear();
const hour = today.getHours().toString().padStart(2, '0');
const minute = today.getMinutes().toString().padStart(2, '0');
const second = today.getSeconds().toString().padStart(2, '0');

export default function UpdateServiceCPN({item}) {
  const refServicesDetail = firebase.firestore().collection('KamiSpaApp-ServicesDetail'); //create a reference to the collection, which can be used throughout our component to query it.

  const [loadingBtn, setLoadingBtn] = useState(false);
  const { id, ServiceName, price, Creator, Time, FinalUpdate } = item;
  const [txtInputServiceName, setTxtInputServiceName] = useState(ServiceName);
  const [txtInputPrice, setTxtInputPrice] = useState(price);

  // Create a new function in our component called addTodo. This method will use our existing ref variable to add a new item to the Firestore database.
  async function UpdateService() {
    // Kiểm tra xem ServiceName có tồn tại trong Firestore hay không
    const serviceExists = await firebase
      .firestore()
      .collection('KamiSpaApp-ServicesDetail')
      .where('ServiceName', '==', txtInputServiceName)
      .get();

    // Nếu ServiceName đã tồn tại, thông báo cho người dùng và không thêm mới
    if (
      (!serviceExists.empty && txtInputPrice === price) ||
      !txtInputServiceName.trim() ||
      !txtInputPrice.trim()
    ) {
      alert('Chưa nhập ServiceName hoặc ServiceName đã tồn tại!');
      setLoadingBtn(false);
      return;
    }

    await refServicesDetail
      .doc(id)
      .update({
        ServiceName: txtInputServiceName,
        price: txtInputPrice,
        Creator: 'Admin Toan',
        Time: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
        FinalUpdate: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
      })
      .then(() => {
        setTxtInputServiceName(txtInputServiceName);
        setTxtInputPrice(txtInputPrice);
        setLoadingBtn(false);
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <View>
      <Text style={styles.textPrimary}>Chỉnh sửa dịch vụ!</Text>
      <Text style={styles.textSecondary}>Bản cập nhật trước đó:</Text>
      <Text>ServiceName: {ServiceName} </Text>
      <Text>price: {price} </Text>
      <Text>Creator: {Creator} </Text>
      <Text>Time: {Time} </Text>
      <Text>Final Update: {FinalUpdate} </Text>
      <TextInput
        textColor="rgb(0, 0, 0)"
        outlineColor="rgb(239, 80, 107)"
        activeOutlineColor="rgb(239, 80, 107)"
        mode="outlined"
        style={styles.textInput}
        label="Service Name"
        value={txtInputServiceName}
        onChangeText={setTxtInputServiceName}
      />
      <TextInput
        textColor="rgb(0, 0, 0)"
        outlineColor="rgb(239, 80, 107)"
        activeOutlineColor="rgb(239, 80, 107)"
        mode="outlined"
        style={styles.textInput}
        label="Price"
        value={txtInputPrice}
        onChangeText={setTxtInputPrice}
      />

      <Button
        style={styles.btnAddService}
        mode="contained"
        labelStyle={{ fontSize: 19 }} // Define font size here
        textColor="rgb(255, 255, 255)"
        loading={loadingBtn ? true : false}
        // icon="playlist-plus"
        icon={({ size, color }) => (
          <Icon
            name="file-document-edit"
            color={color}
            size={30} // Kích thước của icon là 30
          />
        )}
        onPress={() => {
          setLoadingBtn(!loadingBtn);
          UpdateService();
        }}
        // onPress={addService}
      >
        Cập nhật dịch vụ
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  textInput: {
    margin: 5,
    width: 270,
    backgroundColor: 'rgb(255, 255, 255)',
    // borderColor: 'rgb(0, 0, 0)',
  },
  btnAddService: {
    justifyContent: 'center',
    textColor: 'rgb(255, 255, 255)',

    // size: '50',
    // width: 'auto',
    margin: 10,
    height: 55,
    backgroundColor: 'rgb(255, 149, 0)',
    borderRadius: 5,
  },
});
