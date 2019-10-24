import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Text, View, StyleSheet} from 'react-native';

import {ORANGE, SHADOW_EFFECT} from '../utilities/constants/style-constants';
import {generateMaterialIcon} from '../utilities/icon-generator';
import {MapViewStyle} from '../utilities/map-view-style';

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
      {
        title: 'Some Title',
        description: 'some description',
        latlng: {
          latitude: 37.78825,
          longitude: -92.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        title: 'Some Title',
        description: 'some description',
        latlng: {
          latitude: 37.78825,
          longitude: -92.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
    ],
  };

  render() {
    const {style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -92.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={MapViewStyle}>
          {this.state.markers.map(marker => (
            <Marker
              title={marker.title}
              coordinate={marker.latlng}
              description={marker.description}>
              <Text style={styles.marker}>
                {generateMaterialIcon('location-on', 60, ORANGE)}
              </Text>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  marker: {
    ...SHADOW_EFFECT,
    shadowRadius: 10,
    shadowColor: ORANGE,
  },
});

export default MapViewer;
