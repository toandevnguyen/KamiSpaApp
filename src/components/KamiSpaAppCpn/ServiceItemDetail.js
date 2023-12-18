import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

import { firebase } from '../../firebase/firebaseConfig';

function ServiceItemListDetail({ id, ServiceName, price, Creator, Time, FinalUpdate }) {
  const [onPressItem, setOnPressItem] = React.useState(false);

  return (
    <View style={styles.contactInfo}>
      <Text>ServiceName: {ServiceName} </Text>
      <Text>price: {price} </Text>
      <Text>Creator: {Creator} </Text>
      <Text>Time: {Time} </Text>
      <Text>Final Update: {FinalUpdate} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,

    // flexDirection: 'row',
    margin: 5,
    // alignItems: 'center',
    // paddingTop: 16,
    // paddingBottom: 16,
    // paddingRight: 24,
    // borderBottomColor: 'rgb(0, 0, 0)',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(99, 9, 9)',
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: 'rgb(198, 125, 125)',
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
