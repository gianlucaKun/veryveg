import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../../services/BarcodeAPI';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const getBackgroundColor = () => {
    if (product.vegan) {
      return '#6CBF5B'; // Verde se il prodotto è vegan
    } else if (product.vegetarian) {
      return '#F0AF4D'; // Arancio se il prodotto è vegetariano
    } else {
      return '#F45E5E'; // Rosso se il prodotto non è né vegan né vegetariano
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.text}>Descrizione: {product.description}</Text>
      <Text style={styles.text}>Prezzo: {product.vegan} €</Text>
      {/* Aggiungi altre informazioni del prodotto se necessario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default ProductDetails;
