import {Region} from 'react-native-maps';

import {Pin} from '../types';

// Calculates the region to display on the map based on the pins
export const calculateRegion = (pins: Pin[]): Region => {
  let minLat = pins[0].latitude;
  let maxLat = pins[0].latitude;
  let minLon = pins[0].longitude;
  let maxLon = pins[0].longitude;

  pins.forEach(pin => {
    if (pin.latitude < minLat) minLat = pin.latitude;
    if (pin.latitude > maxLat) maxLat = pin.latitude;
    if (pin.longitude < minLon) minLon = pin.longitude;
    if (pin.longitude > maxLon) maxLon = pin.longitude;
  });

  const midLat = (minLat + maxLat) / 2;
  const midLon = (minLon + maxLon) / 2;
  const latDelta = maxLat - minLat + 0.1; // Added buffer to avoid cutting off pins
  const lonDelta = maxLon - minLon + 0.1; // Added buffer to avoid cutting off pins

  return {
    latitude: midLat,
    longitude: midLon,
    latitudeDelta: latDelta,
    longitudeDelta: lonDelta,
  };
};
