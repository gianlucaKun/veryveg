import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useRoute } from '@react-navigation/native';

const PaginaIngredienti : React.FC  = () => {

  const route = useRoute();
  const { codiceProdotto } = route.params;

  return (
    <>
    <Stack.Screen options={{ title: `ingredienti del seguente prodotto: ${codiceProdotto}` }} />
    <View>
      <Text style={{color: 'white'}}>paginaIngredienti</Text>
    </View>
    </>
  )
}

export default PaginaIngredienti;