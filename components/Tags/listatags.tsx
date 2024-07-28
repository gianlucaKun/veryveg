import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface ListaProps {
  prodotto: object;
}

const Listatags: React.FC<ListaProps> = ({ prodotto }) => {

    // implementare logica scelta icone

    // implementare logica face feedback prodotto

  return (
    <View style={styles.container}>
        <View style={styles.contenitore_feedback}>
            <AntDesign name="smile-circle" size={60} color="black" />
        </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.iconContainer}>
        <AntDesign name="heart" size={45} color="black" />
        <AntDesign name="calculator" size={45} color="black" />
        <AntDesign name="unlock" size={45} color="black" />
        <AntDesign name="github" size={45} color="black" />
        <AntDesign name="camera" size={45} color="black" />
        <AntDesign name="chrome" size={45} color="black" />
        <AntDesign name="heart" size={45} color="black" />
        <AntDesign name="calculator" size={45} color="black" />
        <AntDesign name="unlock" size={45} color="black" />
        <AntDesign name="github" size={45} color="black" />
        <AntDesign name="camera" size={45} color="black" />
        <AntDesign name="chrome" size={45} color="black" />
        <AntDesign name="heart" size={45} color="black" />
        <AntDesign name="calculator" size={45} color="black" />
        <AntDesign name="unlock" size={45} color="black" />
        <AntDesign name="github" size={45} color="black" />
        <AntDesign name="camera" size={45} color="black" />
        <AntDesign name="chrome" size={45} color="black" />
      </View>
    </ScrollView>
    </View>
  );
};

export default Listatags;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'gray',
  },
  contenitore_feedback: {
    backgroundColor: 'pink',
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 15,
  },
});