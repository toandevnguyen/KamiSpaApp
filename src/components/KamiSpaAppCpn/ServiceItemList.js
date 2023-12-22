import { ListItem, Overlay } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddServiceCPN from './AddServiceCPN';
import UpdateServiceCPN from './UpdateServiceCPN';
import { firebase } from '../../firebase/firebaseConfig';

function ServiceItemList({ item }) {
  const [onPressItem, setOnPressItem] = React.useState(false);
  const ref = firebase.firestore().collection('KamiSpaApp-ServicesDetail'); //create a reference to the collection, which can be used throughout our component to query it.
  const [overlayVisibleInfo, setOverlayVisibleInfo] = React.useState(false);
  const [overlayVisibleEdit, setOverlayVisibleEdit] = React.useState(false);

  const { id, ServiceName, price, image, Creator, Time, FinalUpdate } = item;
  // async function toggleComplete() {
  //   await firebaseStore.firestore().collection('KamiSpa-db').doc(id).update({
  //     // complete: !complete,
  //   });
  // }
  function ShowInfoService() {
    return (
      <View>
        <Text>ID: {id} </Text>
        <Text>ServiceName: {ServiceName} </Text>
        <Text>price: {price} </Text>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        )}
        <Text>Creator: {Creator} </Text>
        <Text>Time: {Time} </Text>
        <Text>Final Update: {FinalUpdate} </Text>
      </View>
    );
  }

  async function deleteService() {
    await ref
      .doc(id)
      .delete()
      .then(() => {
        // alert('xoa nhe');
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <View style={styles.contactInfo}>
      <ListItem.Swipeable
        onPress={() => setOverlayVisibleInfo(!overlayVisibleInfo)}
        leftWidth={60}
        bottomDivider
        leftContent={
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(0, 149, 255)',
            }}>
            <Icon
              // reverse
              size={30}
              name="information-outline"
              type="material-community"
              color="rgb(255, 255, 255)"
              onPress={() => setOverlayVisibleInfo(!overlayVisibleInfo)}
            />
            <Overlay
              isVisible={overlayVisibleInfo}
              onBackdropPress={() => setOverlayVisibleInfo(!overlayVisibleInfo)}>
              <ShowInfoService />
            </Overlay>
          </View>
        }
        rightContent={
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              backgroundColor: 'rgb(119, 207, 55)',
            }}>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(255, 149, 0)',
              }}>
              <Icon
                size={30}
                name="file-document-edit"
                type="material-community"
                color="rgb(255, 255, 255)"
                onPress={() => {
                  setOverlayVisibleEdit(!overlayVisibleEdit);
                  // return <UpdateServiceCPN id={id} />;
                }}
              />
              <Overlay
                isVisible={overlayVisibleEdit}
                onBackdropPress={() => setOverlayVisibleEdit(!overlayVisibleEdit)}>
                <UpdateServiceCPN item={item} />
              </Overlay>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(255, 60, 0)',
              }}>
              <Icon
                // raised
                // reverse
                size={30}
                name="delete-alert"
                type="material-community"
                color="rgb(255, 255, 255)"
                onPress={() => deleteService()}
              />
            </View>
          </View>
        }>
        <Icon
          size={25}
          name={onPressItem ? 'checkbox-marked' : 'checkbox-blank-outline'}
          type="material-community"
          color="rgb(239, 80, 107)"
          onPress={() => setOnPressItem(!onPressItem)}
        />
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'rgb(199, 55, 55)',
          }}>
          <ListItem.Title>{ServiceName}</ListItem.Title>
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 20, height: 20, alignSelf: 'center' }}
            />
          )} */}
          <ListItem.Title>{price}</ListItem.Title>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem.Swipeable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,
    margin: 5,
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
export default React.memo(ServiceItemList);
/*{/* <List.Item
        title={ServiceName}
        titleStyle={{ alignSelf: 'flex-start', color: 'rgb(0, 0, 0)' }}
        right={() => <Text style={{ alignSelf: 'flex-end' }}>{price}</Text>}
        // titleStyle={{ flex: 1 }}
        // right={() => <Text style={{ textAlign: 'right' }}>{price}</Text>}

        onPress={() => setOnPressItem(!onPressItem)}
        left={(props) => (
          <List.Icon
            {...props}
            icon={onPressItem ? 'checkbox-marked' : 'checkbox-blank-outline'}
            color="rgb(239, 80, 107)"
          />
        )}
      /> */

// contactInfo: {
//   flex: 1,

//   // flexDirection: 'row',
//   margin: 5,
//   // alignItems: 'center',
//   // paddingTop: 16,
//   // paddingBottom: 16,
//   // paddingRight: 24,
//   // borderBottomColor: 'rgb(0, 0, 0)',
//   // borderBottomWidth: StyleSheet.hairlineWidth,
//   // borderColor: 'rgb(99, 9, 9)',
//   // borderWidth: 1,
//   // borderRadius: 10,
//   // backgroundColor: 'rgb(198, 125, 125)',
// },
