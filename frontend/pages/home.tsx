// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AggiungiProdotto from '../components/forms/formAddProduct';


const HomeScreen: React.FC = () => {
  return (
    <View style={style.body}>
      <Text>Home Screen</Text>
      <Text>bla bla bla</Text>
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  body : {
    marginTop : 50,
    height : '100%',
    backgroundColor: '#343434',
    display: 'flex',
    alignItems: 'center',
  },
});