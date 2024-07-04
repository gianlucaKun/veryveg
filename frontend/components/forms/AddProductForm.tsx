import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { Product } from '../../services/BarcodeAPI';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
  code: string;
  onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, code, onCancel }) => {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState(code);
  const [description, setDescription] = useState('');
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);

  const handleAddProduct = () => {
    const newProduct: Product = {
      name,
      barcode,
      description,
      vegan,
      vegetarian,
    };

    onAddProduct(newProduct);

    // Reset form fields after adding the product
    setName('');
    setDescription('');
    setVegan(false);
    setVegetarian(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Prodotto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
        editable={false} // Prevent editing barcode once scanned
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrizione"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.switchContainer}>
        <Text>Vegan</Text>
        <Switch value={vegan} onValueChange={(value) => setVegan(value)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Vegetarian</Text>
        <Switch value={vegetarian} onValueChange={(value) => setVegetarian(value)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Aggiungi Prodotto" onPress={handleAddProduct} />
        <Button title="Annulla" onPress={onCancel} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AddProductForm;
