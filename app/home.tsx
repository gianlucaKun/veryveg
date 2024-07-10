import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { prodottoveryveg } from '@/models/products';

const Home = () => {
  const router = useRouter();

  const product  = {
    name: 'VeryVeg Burger',
    barcode: '1234567890123',
    description: 'A delicious vegan burger made from organic ingredients.',
    vegan: true,
    vegetarian: true,
  };

  const navigateToHiddenPage = () => {
    router.push({
      pathname: 'hiddenDatails',
      params: { product: JSON.stringify(product) },
    }); // Naviga alla pagina nascosta
  };

  return (
    <View>
      <Text>Ah boh da pensarci in futuro</Text>
    </View>
  );
};

export default Home;