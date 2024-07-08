import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ImageBackground, StyleSheet, Dimensions, FlatList } from 'react-native';
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

    const renderItem = ({ item }) => (
        <SchedaProdotto description={item.description} name={item.name} vegan={item.vegan} vegetarian={item.vegetarian} />
    );

    return (
        <ImageBackground source={require('../assets/leaf.png')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Button title="Ricevi prodotti" onPress={getProductV2} />
                    <Text style={styles.title}>Lista prodotti scansionati</Text>
                    <FlatList
                        data={lista}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: height,
        resizeMode: 'cover',
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#fff',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 80,  // Aggiunto padding inferiore per evitare che l'ultimo elemento sia nascosto
    },
});

export default DetailsScreen;
