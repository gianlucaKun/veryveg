import { View, Text, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface BottoneProps {
  testo?: string;
  stile?: StyleProp<ViewStyle>;
  onClick?: () => void;
  icona?: JSX.Element;
}

const Bottone: React.FC<BottoneProps> = ({ testo, stile, onClick, icona }) => {
  return (
    <TouchableOpacity style={stile ? stile : styles.buttonContainer} onPress={onClick}>
      {icona ? icona : null}
      <Text style={styles.testo}>{testo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  testo: {
    fontSize: 26,
    color: '#926FFF',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
});

export default Bottone;