import React from 'react';
import { View, Text, Button, Alert, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { testApi } from '../services/BarcodeAPI';

const { width, height } = Dimensions.get('window');

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
        <ImageBackground source={require('../assets/leaf.png')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text>Details Screen</Text>
                    <Button title="Test API" onPress={handleTestApi} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,  // Utilizza le dimensioni dello schermo
        height: height, // Utilizza le dimensioni dello schermo
        resizeMode: 'cover', // o 'contain' per rispettare l'aspect ratio dell'immagine
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)', 
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});

export default DetailsScreen;
