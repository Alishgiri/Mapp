import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Text, View, StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {
  generateOcticon,
  generateMaterialIcon,
} from '../utilities/icon-generator';
import Circle from './accessory/Cirlcle';
import CircleWithWave from './accessory/CircleWithWave';
import {MapViewStyle} from '../utilities/map-view-style';
import CreateEventMapCircle from './accessory/CreateEventMapCircle';
import {ORANGE, getDimentions} from '../utilities/constants/style-constants';

class MapViewer extends React.Component {
  state = {
    markers: [
      {
        title: 'Some Title',
        description: 'some description',
        latlng: {
          latitude: 37.78825,
          longitude: -90.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
    ],
  };

  render() {
    const {style, eventMode, displayPeople, onPressSociteni} = this.props;
    return (
      <View style={[styles.container, style]}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -90.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={MapViewStyle}>
          {this.state.markers.map(marker => (
            <Marker
              title={marker.title}
              coordinate={marker.latlng}
              key={marker.latlng.latitude}
              description={marker.description}>
              <Text style={styles.marker}>
                {generateMaterialIcon('location-on', 60, ORANGE)}
              </Text>
            </Marker>
          ))}
        </MapView>
        {eventMode && <CreateEventMapCircle />}
        {!eventMode && displayPeople === null && (
          <>
            <Circle title={32} size={60} coordinates={{top: 200, right: 80}} />
            <Circle
              size={40}
              title={18}
              coordinates={{top: getDimentions().height / 2, left: 50}}
            />
            <Circle
              size={60}
              title={24}
              coordinates={{bottom: 100, right: 90}}
            />
            <Circle title={8} size={30} coordinates={{top: 150, left: 120}} />
          </>
        )}
        {displayPeople !== null && (
          <CircleWithWave displayPeople={displayPeople} />
        )}
        <AppButton
          title="Sociteni"
          onPress={onPressSociteni}
          titleStyle={styles.button_text}
          icon={generateOcticon('location', 15)}
          style={styles.sociteni_button_background}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    shadowRadius: 10,
    shadowColor: ORANGE,
  },
  sociteni_button_background: {
    top: 20,
    left: 20,
    elevation: 2,
    borderRadius: 20,
    paddingVertical: 8,
    position: 'absolute',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});

export default MapViewer;
