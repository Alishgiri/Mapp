import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

function MapViewer({lat = 28.3949, long = 84.124, style, description}) {
  const latlong = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  return (
    <View style={[styles.container, style]}>
      <MapView style={styles.map} initialRegion={latlong}>
        <Marker
          coordinate={latlong}
          title="Tracked Location"
          description={description}
        />
      </MapView>
    </View>
  );
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
});

export default MapViewer;
