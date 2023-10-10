interface Connector {
  type: 'J1772' | 'Type2' | 'CCS 2' | 'Type 3' | string;
  status: 'available' | 'unavailable' | string;
}

export interface Pin {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
}
