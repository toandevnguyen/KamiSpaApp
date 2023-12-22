import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Avatar, List } from 'react-native-paper';

function UserItemListDetail({ id, email, role, image }) {
  // const [onPressItem, setOnPressItem] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.contactInfo}>
        <View style={styles.txtInfoService}>
          <Text>id: {id} </Text>
          <Text>email: {email} </Text>
          <Text>role: {role} </Text>
        </View>
        <Avatar.Text size={100} label={email.split('')[0]} />
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
  txtInfoService: {
    // backgroundColor: 'rgb(208, 77, 77)',
    justifyContent: 'center',
  },

  avtImg: {
    justifyContent: 'center',
    textAlign: 'center',
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
export default React.memo(UserItemListDetail);
