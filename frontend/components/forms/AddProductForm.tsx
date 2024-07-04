import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Product } from '../../services/BarcodeAPI'

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({onAddProduct}) => {

  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState("");
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);

  const handleAddProduct = () => {

    const newProduct: Product = {
      name,
      barcode,
      description,
      vegan,
      vegetarian
    };

    onAddProduct(newProduct);

    setName('');
    setBarcode('');
    setDescription('');
    setVegan(false);
    setVegetarian(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nome Prodotto'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Barcode'
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrizione"
        value={description}
        onChangeText={setDescription}
        multiline
      />
   <View style={styles.switchContainer}>
        <Text>Vegan</Text>
        <Switch
          value={vegan}
          onValueChange={(value) => setVegan(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Vegetarian</Text>
        <Switch
          value={vegetarian}
          onValueChange={(value) => setVegetarian(value)}
        />
      </View>
      <Button title="Aggiungi Prodotto" onPress={handleAddProduct} />
    </View>
  )
}
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
});

export default AddProductForm