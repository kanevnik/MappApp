import React from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';

import {Pin} from '../types';

interface PinDetailsProps {
  pin: Pin;
  onClose: () => void;
  onCenterMap: () => void;
}

const PinDetails: React.FC<PinDetailsProps> = ({pin, onClose, onCenterMap}) => {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{pin.title}</Text>
        <TouchableOpacity onPress={onCenterMap} style={styles.centerButton}>
          <Text style={styles.centerText}>Center</Text>
        </TouchableOpacity>
      </View>
      {pin.connectors.map((connector, index) => (
        <View key={index} style={styles.connectorRow}>
          <Text
            style={[
              styles.connectorType,
              {color: connector.status === 'available' ? 'green' : 'red'},
            ]}>
            {connector.type}
          </Text>
          <Text style={styles.connectorStatus}>{connector.status}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerButton: {
    backgroundColor: '#e0e0e0', // Light grey background
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  centerText: {
    color: 'blue',
  },
  connectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  connectorType: {
    marginRight: 10,
    fontWeight: '600',
  },
  connectorStatus: {
    fontWeight: '400',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  closeText: {
    color: 'blue',
  },
});

export default PinDetails;
