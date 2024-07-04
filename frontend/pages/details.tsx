import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { testApi } from '../services/BarcodeAPI';

const DetailsScreen: React.FC = () => {

    const handleTestApi = async () => {
        try {
            const response = await testApi();
            Alert.alert('Test API', 'Test API completato con successo.');
            console.log('Risposta test API:', response);
        } catch (error) {
            console.error('Errore durante il test dell\'API:', error);
            Alert.alert('Errore', 'Si è verificato un problema durante il test dell\'API.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details Screen</Text>
            <Button title="Test API" onPress={handleTestApi} />
        </View>
    );
};

export default DetailsScreen;
