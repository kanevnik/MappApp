import {Region} from 'react-native-maps';

import {Pin} from '../types';

export const createGrid = (pins: Pin[], gridSize: number) => {
  const grid: Record<string, Pin[]> = {};

  pins.forEach(pin => {
    const gridX = Math.floor(pin.latitude / gridSize);
    const gridY = Math.floor(pin.longitude / gridSize);
    const key = `${gridX},${gridY}`;

    if (!grid[key]) {
      grid[key] = [];
    }

    grid[key].push(pin);
  });

  return grid;
};

export const getVisiblePins = (
  grid: Record<string, Pin[]>,
  region: Region,
  gridSize: number,
) => {
  const {latitude, longitude, latitudeDelta, longitudeDelta} = region;
  const minLat = latitude - latitudeDelta / 2;
  const maxLat = latitude + latitudeDelta / 2;
  const minLon = longitude - longitudeDelta / 2;
  const maxLon = longitude + longitudeDelta / 2;

  const minGridX = Math.floor(minLat / gridSize);
  const maxGridX = Math.floor(maxLat / gridSize);
  const minGridY = Math.floor(minLon / gridSize);
  const maxGridY = Math.floor(maxLon / gridSize);

  let visiblePins: Pin[] = [];

  for (let x = minGridX; x <= maxGridX; x++) {
    for (let y = minGridY; y <= maxGridY; y++) {
      const key = `${x},${y}`;
      if (grid[key]) {
        visiblePins = visiblePins.concat(grid[key]);
      }
    }
  }

  return visiblePins;
};
