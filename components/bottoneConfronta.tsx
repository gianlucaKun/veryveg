import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface listaConfrontaProps {
    codice: string;
}

const BottoneConfronta: React.FC<listaConfrontaProps> = ({ codice }) => {
    const navigation = useNavigation();

    const handleClick = () => {
      navigation.navigate('paginaConfronta', {codiceProdotto1: codice});
    }

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
            <Text style={styles.testo}>Confronta</Text>
            <AntDesign name="doubleright" size={30} color="black" />
        </Pressable>
    )
}

export default BottoneConfronta;

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 15, // Utilizza marginHorizontal o padding
    },
    testo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});