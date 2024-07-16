// ProductForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { prodottoveryveg } from '@/models/products';
import { Feather } from '@expo/vector-icons';

interface ProductFormProps {
  barcode: string;
  onSubmit: (product: prodottoveryveg) => void;
  onClose: () => void; // funzione per chiudere il form
}

const ProductForm: React.FC<ProductFormProps> = ({ barcode, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);

  const handleSubmit = () => {
    const newProduct: prodottoveryveg = {
      name,
      description,
      barcode,
      vegan,
      vegetarian,
      ingredients: [], // Aggiungi logica per gestire gli ingredienti se necessario
    };
    onSubmit(newProduct);
  };

  return (
    <View style={styles.container} >
        <Text style={styles.title}>Aggiungi un nuovo prodotto</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={32} color="red" />
      </TouchableOpacity>
      <View style={styles.formcontainer}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Descrizione</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Barcode</Text>
      <TextInput style={styles.input} value={barcode} editable={false} selectTextOnFocus={false} />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Vegan</Text>
        <Switch value={vegan} onValueChange={setVegan} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Vegetarian</Text>
        <Switch value={vegetarian} onValueChange={setVegetarian} />
      </View>
      </View>
      <Button title="Aggiungi Prodotto" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    height: 500,
    padding: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -600,
    left: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    color: 'green'
  },
  formcontainer : {
    marginTop: 25
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ProductForm;
