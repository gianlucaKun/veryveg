import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface TagsProps {
  prodotto: object;
}

const TagsTipologia: React.FC<TagsProps> = ({ prodotto }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista} // Usare contentContainerStyle per gestire il layout degli elementi scrollabili
      >
        <View style={styles.scrollViewContent}>
            <View style={styles.contenitoreIcone}>
                <AntDesign name="heart" size={50} color="black" />
            </View>
            <View style={styles.contenitoreIcone}>
                <AntDesign name="heart" size={50} color="black" />
            </View>
            <View style={styles.contenitoreIcone}>
                <AntDesign name="heart" size={50} color="black" />
            </View>
            <View style={styles.contenitoreIcone}>
                <AntDesign name="heart" size={50} color="black" />
            </View>
            <View style={styles.contenitoreIcone}>
                <AntDesign name="heart" size={50} color="black" />
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TagsTipologia;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center', // Centra la ScrollView orizzontalemente
  },
  lista: {
    alignItems: 'center', // Centra il contenuto della ScrollView
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contenitoreIcone: {
    backgroundColor: 'white',
    padding:15,
    borderRadius: 100,
    marginHorizontal: 10,
  },
});