import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Dimensions, FlatList } from 'react-native';
import { prodottoveryveg } from '../models/products';
import { getAll_product } from '../services/ProductAPI';
import SchedaProdottoTimeLine from '@/components/schede/SchedaProdottoTimeline';
import { useRouter } from 'expo-router';

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
    };

    const router = useRouter();

    const navigateToHiddenPage = (prodotto: prodottoveryveg) => {
        router.push({
            pathname: 'hiddenDatails',
            params: { product: JSON.stringify(prodotto) },
        }); // Naviga alla pagina nascosta
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Button title="Ricevi prodotti" onPress={getProductV2} />
                <Text style={styles.title}>Lista prodotti scansionati</Text>
                <FlatList
                    data={lista}
                    keyExtractor={(item) => item.barcode || item.name}
                    renderItem={({ item }) => (
                        <SchedaProdottoTimeLine 
                            prodotto={item} 
                            colore='#F2D6FF' 
                            onClick={() => navigateToHiddenPage(item)} 
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
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
        paddingHorizontal: 25,
        paddingBottom: 80,  // Added padding bottom to avoid hiding the last element
    },
});

export default DetailsScreen;