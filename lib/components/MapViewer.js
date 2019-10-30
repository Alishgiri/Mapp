import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Text, View, StyleSheet} from 'react-native';

import {Label} from './ui/Label';
import {
  ORANGE,
  PURPLE,
  getDimentions,
  SHADOW_EFFECT,
} from '../utilities/constants/style-constants';
import {MapViewStyle} from '../utilities/map-view-style';
import {generateMaterialIcon} from '../utilities/icon-generator';

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

  generateCircle(size, num, coordinates) {
    return (
      <View style={styles.floating_view(size, coordinates)}>
        <Label color="white" title={num} fontWeight="bold" />
      </View>
    );
  }

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
              key={marker.latlng.latitude}
              description={marker.description}>
              <Text style={styles.marker}>
                {generateMaterialIcon('location-on', 60, ORANGE)}
              </Text>
            </Marker>
          ))}
        </MapView>
        {this.generateCircle(60, 32, {top: 200, right: 80})}
        {this.generateCircle(40, 18, {
          top: getDimentions().height / 2,
          left: 50,
        })}
        {this.generateCircle(60, 24, {bottom: 100, right: 90})}
        {this.generateCircle(30, 8, {top: 150, left: 120})}
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
  floating_view: function(size, coordinates) {
    return {
      width: size,
      height: size,
      ...coordinates,
      position: 'absolute',
      alignItems: 'center',
      borderRadius: size / 2,
      backgroundColor: PURPLE,
      justifyContent: 'center',
    };
  },
});

export default MapViewer;
