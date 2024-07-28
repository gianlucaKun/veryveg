import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const PaginaConfronta: React.FC = () => {
    const route = useRoute();
    const { codiceProdotto1 } = route.params;
    // Aggiungere logica del confronto tra prodotti
    
    return (
        <>
            <Stack.Screen options={{ title: `Pagina di confronto di ${codiceProdotto1}` }} />
            <View>
                <Text style={{color: 'white'}}>Pagina di confronto tra prodotti: {codiceProdotto1}</Text>
            </View>
        </>
    );
}

export default PaginaConfronta;