import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './components/navbar/navBar';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Prove: undefined;
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
};

export default App;