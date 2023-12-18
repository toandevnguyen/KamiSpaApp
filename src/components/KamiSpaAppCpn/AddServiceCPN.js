import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { firebase } from '../../firebase/firebaseConfig';

// ImagePicker.requestMediaLibraryPermissionsAsync();

const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = today.getMonth() + 1;
const year = today.getFullYear();
const hour = today.getHours().toString().padStart(2, '0');
const minute = today.getMinutes().toString().padStart(2, '0');
const second = today.getSeconds().toString().padStart(2, '0');

const AddServiceCPN = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  // No permissions request is necessary for launching the image library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Upload media files
  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.error('XHR Error:', e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);
      setUploading(false);
      alert('Uploaded ');
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const ref = firebase.firestore().collection('KamiSpa-db'); //create a reference to the collection, which can be used throughout our component to query it.

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [txtInputServiceName, setTxtInputServiceName] = useState('');
  const [txtInputPrice, setTxtInputPrice] = useState('');

  async function AddService() {
    // Kiểm tra xem ServiceName có tồn tại trong Firestore hay không
    const serviceExists = await firebase
      .firestore()
      .collection('KamiSpa-db')
      .where('ServiceName', '==', txtInputServiceName)
      .get();

    // Nếu ServiceName đã tồn tại, thông báo cho người dùng và không thêm mới
    if (!serviceExists.empty || !txtInputServiceName.trim()) {
      alert('Chưa nhập ServiceName hoặc ServiceName đã tồn tại!');
      setLoadingBtn(false);
      return;
    }
    await ref.add({
      ServiceName: txtInputServiceName,
      price: txtInputPrice,
      Creator: 'Admin Toan',
      Time: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
      FinalUpdate: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
    });

    // Đặt giá trị của biến todo thành chuỗi rỗng.
    setTxtInputServiceName('');
    setTxtInputPrice('');
    setLoadingBtn(false);
  }
  return (
    <View>
      <Text style={styles.textPrimary}>Xin chào!</Text>
      <Text style={styles.textSecondary}>Thêm mới dịch vụ ở đây:</Text>
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
        loading={!!loadingBtn}
        // icon="playlist-plus"
        icon={({ size, color }) => (
          <Icon
            name="playlist-plus"
            color={color}
            size={30} // Kích thước của icon là 30
          />
        )}
        onPress={() => {
          setLoadingBtn(!loadingBtn);
          pickImage();
        }}
        // onPress={addService}
      >
        Upload Image
      </Button>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      )}
      <Button
        style={styles.btnAddService}
        mode="contained"
        labelStyle={{ fontSize: 19 }} // Define font size here
        textColor="rgb(255, 255, 255)"
        loading={!!loadingBtn}
        // icon="playlist-plus"
        icon={({ size, color }) => (
          <Icon
            name="playlist-plus"
            color={color}
            size={30} // Kích thước của icon là 30
          />
        )}
        onPress={() => {
          setLoadingBtn(!loadingBtn);
          // AddService();
          uploadMedia();
        }}
        // onPress={addService}
      >
        Thêm dịch vụ
      </Button>
    </View>
  );
};

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
    backgroundColor: 'rgb(239, 80, 107)',
    borderRadius: 5,
  },
});

export default AddServiceCPN;
