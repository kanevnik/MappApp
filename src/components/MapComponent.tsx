import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';

import {RootState} from '../store/store';
import {setPins, setVisibleRegion, selectPin} from '../slices/mapSlice';

import PinDetails from './PinDetails';

import pinsData from '../assets/data/pinsData.json';
import {Pin} from '../types';
import {initialRegion} from '../assets/data/constants';

const MapComponent: React.FC = () => {
  const mapViewRef = useRef<MapView>(null);

  const dispatch = useDispatch();
  const {visiblePins, selectedPin} = useSelector(
    (state: RootState) => state.map,
  );

  useEffect(() => {
    dispatch(setPins(pinsData as Pin[]));
  }, [dispatch]);

  const handleRegionChange = (region: Region) => {
    dispatch(setVisibleRegion(region));
  };

  const handlePinPress = (pinId: string) => {
    dispatch(selectPin(pinId));
  };

  const handleCenterMap = (latitude: number, longitude: number) => {
    mapViewRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  };

  return (
    <>
      <MapView
        ref={mapViewRef}
        style={{flex: 1}}
        onRegionChangeComplete={handleRegionChange}
        provider={PROVIDER_GOOGLE}
        region={initialRegion}>
        {visiblePins.map(pin => (
          <Marker
            key={pin._id}
            coordinate={{latitude: pin.latitude, longitude: pin.longitude}}
            onPress={() => handlePinPress(pin._id)}
          />
        ))}
      </MapView>
      {selectedPin && (
        <PinDetails
          pin={selectedPin}
          onClose={() => dispatch(selectPin(''))}
          onCenterMap={() =>
            handleCenterMap(selectedPin.latitude, selectedPin.longitude)
          }
        />
      )}
    </>
  );
};

export default MapComponent;
