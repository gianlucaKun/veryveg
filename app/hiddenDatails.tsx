import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { prodottoveryveg } from '@/models/products';

/*
    prova per vedere come si passano le props da una pagina all'altra
*/

const HiddenDetails = () => {
  const router = useRouter();
  const { product } = useLocalSearchParams();
  
  const parsedProduct: prodottoveryveg = product ? JSON.parse(product as string) : {};

  return (
    <View style={styles.container}>
        <Button title='back' onPress={()=> router.back()}/>
      <Text style={styles.name}>{parsedProduct.name}</Text>
      {parsedProduct.barcode && <Text style={styles.barcode}>Barcode: {parsedProduct.barcode}</Text>}
      <Text style={styles.description}>{parsedProduct.description}</Text>
      <View style={styles.labels}>
        {parsedProduct.vegan && <Text style={[styles.label, styles.vegan]}>Vegan</Text>}
        {parsedProduct.vegetarian && <Text style={[styles.label, styles.vegetarian]}>Vegetarian</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  barcode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  vegan: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  vegetarian: {
    backgroundColor: '#ffeb3b',
    color: '#333',
  },
});

export default HiddenDetails;
