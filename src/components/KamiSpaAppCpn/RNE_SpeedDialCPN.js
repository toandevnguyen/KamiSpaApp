import { Overlay, SpeedDial } from '@rneui/themed';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddServiceCPN from './AddServiceCPN';

export default function RNE_SpeedDialCPN() {
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  // const onPressSpeedDial = () => {
  //   setOverlayVisible(!overlayVisible);
  //   setOpenSpeedDial(!openSpeedDial);
  // };
  return (
    <>
      <SpeedDial
        // overlayColor=''

        style={{ paddingBottom: 30 }}
        color="rgb(239, 80, 107)"
        isOpen={openSpeedDial}
        openIcon={() => <Icon name="close" type="material-community" color="#fff" size={24} />}
        onOpen={() => setOpenSpeedDial(!openSpeedDial)}
        onClose={() => setOpenSpeedDial(!openSpeedDial)}
        transitionDuration={150}
        icon={() => <Icon name="pencil" type="material-community" color="#fff" size={24} />}>
        <SpeedDial.Action
          color="rgb(239, 80, 107)"
          icon={() => <Icon name="folder-plus" type="material-community" color="#fff" size={23} />}
          title="Add"
          onPress={() => {
            setOverlayVisible(!overlayVisible);
          }}
        />
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => setOverlayVisible(!overlayVisible)}>
          <AddServiceCPN />
        </Overlay>
        <SpeedDial.Action
          color="rgb(239, 80, 107)"
          icon={() => <Icon name="delete-alert" type="material-community" color="#fff" size={24} />}
          title="Delete"
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>

      {/* {overlayVisible === true ? <RNE_OverlayCPN /> : null} */}
    </>
  );
}
