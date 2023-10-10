import {Region} from 'react-native-maps';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Pin} from '../types';
import {createGrid, getVisiblePins} from '../utils/gridUtils';
import {initialRegion} from '../assets/data/constants';

const MAX_VISIBLE_PINS = 250;

const HARD_FILTER_LIMIT = 1000;

const GRID_SIZE = 0.8;

const filterPinsByAvailability = (pins: Pin[]) => {
  if (pins.length < MAX_VISIBLE_PINS) return pins;

  // Filter pins with available connectors
  const availablePins = pins.filter(pin =>
    pins.length < HARD_FILTER_LIMIT
      ? pin.connectors.some(connector => connector.status === 'available')
      : pin.connectors.every(connector => connector.status === 'available'),
  );

  // Randomly select pins up to MAX_VISIBLE_PINS
  const selectedPins: Pin[] = [];
  while (selectedPins.length < MAX_VISIBLE_PINS && availablePins.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePins.length);
    selectedPins.push(availablePins[randomIndex]);

    // Swap the selected item with the last item
    availablePins[randomIndex] = availablePins[availablePins.length - 1];

    // Remove the last item
    availablePins.pop();
  }

  return selectedPins;
};

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    pins: [] as Pin[],
    grid: {} as Record<string, Pin[]>,
    visiblePins: [] as Pin[],
    selectedPin: null as Pin | null,
  },
  reducers: {
    setPins: (state, action: PayloadAction<Pin[]>) => {
      state.pins = action.payload;
      state.grid = createGrid(action.payload, GRID_SIZE);
      state.visiblePins = getVisiblePins(state.grid, initialRegion, GRID_SIZE);
    },
    setVisibleRegion: (state, action: PayloadAction<Region>) => {
      const allVisiblePins = getVisiblePins(
        state.grid,
        action.payload,
        GRID_SIZE,
      );

      const selectedPins = filterPinsByAvailability(allVisiblePins);

      state.visiblePins = selectedPins;
    },
    selectPin: (state, action: PayloadAction<string>) => {
      state.selectedPin =
        state.pins.find(pin => pin._id === action.payload) || null;
    },
  },
});

export const {setPins, setVisibleRegion, selectPin} = mapSlice.actions;
export default mapSlice.reducer;
