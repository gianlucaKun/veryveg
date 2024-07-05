import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { prodottoveryveg } from '../models/products';

import { getAll_product } from '../services/ProductAPI';

import SchedaProdotto from '../components/schede/schedaProdotto';

const { width, height } = Dimensions.get('window');

const DetailsScreen: React.FC = () => {

    const [lista, setLista] = useState<prodottoveryveg[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getAll_product();
                setLista(products);
            } catch (error) {
                console.error("Errore nel recupero dei prodotti", error);
            }
        };
        fetchProducts();
    }, []);

    const getProductV2 = async () => {
        try {
            const products = await getAll_product();
            setLista(products);
        } catch (error) {
            console.error("Errore nel recupero dei prodotti", error);
        }
    }

    return (
        <ImageBackground source={require('../assets/leaf.png')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Button title="Ricevi prodotti" onPress={getProductV2}/>
                    <Text>Lista prodotti scansionati</Text>
                    {lista.map((prodotto, index) => (
                        <View key={index}>
                            <SchedaProdotto description={prodotto.description} name={prodotto.name} vegan={prodotto.vegan} vegetarian={prodotto.vegetarian}/>
                        </View>))}
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
