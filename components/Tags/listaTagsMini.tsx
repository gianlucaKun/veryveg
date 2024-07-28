import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface ListaProps {
  prodotto: object;
}

const ListatagsMini: React.FC<ListaProps> = ({ prodotto }) => {

    // implementare logica scelta icone

    // implementare logica face feedback prodotto

  return (
    <View style={styles.container}>
        <View style={styles.contenitore_feedback}>
            <AntDesign name="smile-circle" size={60} color="black" />
        </View>
      <View style={styles.iconContainer}>
        <AntDesign name="heart" size={30} color="black" />
        <AntDesign name="calculator" size={30} color="black" />
        <AntDesign name="unlock" size={30} color="black" />
        <AntDesign name="github" size={30} color="black" />
        <AntDesign name="camera" size={30} color="black" />
        <AntDesign name="chrome" size={30} color="black" />
        <AntDesign name="heart" size={30} color="black" />
        <AntDesign name="calculator" size={30} color="black" />
        <AntDesign name="unlock" size={30} color="black" />
        <AntDesign name="github" size={30} color="black" />
        <AntDesign name="camera" size={30} color="black" />
        <AntDesign name="chrome" size={30} color="black" />
      </View>
    </View>
  );
};

export default ListatagsMini;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 15,
    width: '100%',
  },
  contenitore_feedback: {
    padding: 10,
    marginBottom: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingHorizontal: 15,
    width: 200,
    height: 100,
    overflow: 'hidden',
  },
});