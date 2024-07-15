import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addProduct } from '@/services/ProductAPI';

interface ProdottoVeryVeg {
  name: string;
  barcode?: string;
  description: string;
  vegan: boolean;
  vegetarian: boolean;
}

const Aggiungi: React.FC = () => {
  const router = useRouter();
  const { codice } = useLocalSearchParams();

  const [product, setProduct] = useState<ProdottoVeryVeg>({
    name: '',
    barcode: codice as string,
    description: '',
    vegan: false,
    vegetarian: false,
  });

  const handleInputChange = (name: keyof ProdottoVeryVeg, value: any) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSave = async () => {
    try {
      await addProduct(product);
      Alert.alert('Prodotto Salvato', `Il prodotto ${product.name} è stato salvato con successo!`);
      router.push('scansiona');
    } catch (error) {
      Alert.alert('Errore', 'C\'è stato un problema nel salvataggio del prodotto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome del Prodotto</Text>
      <TextInput
        style={styles.input}
        value={product.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <Text style={styles.label}>Codice a Barre</Text>
      <TextInput
        style={styles.input}
        value={product.barcode}
        onChangeText={(value) => handleInputChange('barcode', value)}
      />
      <Text style={styles.label}>Descrizione</Text>
      <TextInput
        style={styles.input}
        value={product.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Vegan</Text>
        <Switch
          value={product.vegan}
          onValueChange={(value) => handleInputChange('vegan', value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Vegetariano</Text>
        <Switch
          value={product.vegetarian}
          onValueChange={(value) => handleInputChange('vegetarian', value)}
        />
      </View>
      <Button title="Salva" onPress={handleSave} />
    </ScrollView>
  );
};

export default Aggiungi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
