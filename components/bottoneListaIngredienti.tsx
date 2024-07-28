import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

interface ListaIngredientiProps {
    codice: string;
}

const BottoneListaIngredienti: React.FC<ListaIngredientiProps> = ({ codice }) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('paginaIngredienti', {codiceProdotto: codice});
    };

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'lightgray' : 'gray',
                },
                styles.container,
            ]}
            onPress={handleClick}
        >
            <Text style={styles.testo}>Ingredienti</Text>
            <AntDesign name="doubleright" size={30} color="black" />
        </Pressable>
    );
};

export default BottoneListaIngredienti;

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20, // Aggiunto per evitare gap, se `gap` non è una proprietà valida
    },
    testo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10, // Spaziatura tra il testo e l'icona
    },
});