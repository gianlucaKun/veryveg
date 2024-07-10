import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { prodottoveryveg } from '@/models/products';

const ProductCard = ({ product }: { product: prodottoveryveg }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      {product.barcode && <Text style={styles.barcode}>Barcode: {product.barcode}</Text>}
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.labels}>
        {product.vegan && <Text style={[styles.label, styles.vegan]}>Vegan</Text>}
        {product.vegetarian && <Text style={[styles.label, styles.vegetarian]}>Vegetarian</Text>}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
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