import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { List } from 'react-native-paper';

import { firebase } from '../../firebase/firebaseConfig';

function ServiceItemListDetail({ id, ServiceName, price, Creator, Time, FinalUpdate, image }) {
  const [onPressItem, setOnPressItem] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <View style={styles.txtInfoService}>
          <Text>ServiceName: {ServiceName} </Text>
          <Text>price: {price} </Text>
          <Text>Creator: {Creator} </Text>
          <Text>Time: {Time} </Text>
          <Text>Final Update: {FinalUpdate} </Text>
        </View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              // backgroundColor: 'rgb(249, 94, 94)',
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    margin: 5,
    borderColor: 'rgb(99, 9, 9)',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },

  right: {
    flex: 1,
    textAlign: 'right',
  },
});
export default React.memo(ServiceItemListDetail);
