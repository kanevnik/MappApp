import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import MapComponent from './src/components/MapComponent';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MapComponent />
    </Provider>
  );
};

export default App;
