import React from "react";
import { prodottoveryveg } from "@/models/products";
import { View, Text, StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const SchedaProdotto: React.FC<prodottoveryveg> = ({ name, description, vegan, vegetarian }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerProduct}>
                <Text style={styles.nomeProdotto}>{name}</Text>
                <Text>Descrizione: {description}</Text>
            </View>
            <View style={styles.containerVeg}>
                <Text style={[styles.vegan, vegan ? styles.si : styles.no]}>
                    Vegano: {vegan ? "Si" : "No"}
                </Text>
                <Text style={[styles.vegetarian, vegetarian ? styles.si : styles.no]}>
                    Vegetariano: {vegetarian ? "Si" : "No"}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        height: 'auto',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerProduct: {
        flex: 2,
        marginRight: 10,
    },
    containerVeg: {
        flex: 1,
        justifyContent: 'center',
    },
    nomeProdotto: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'green'
    },
    vegan: {
        fontSize: 16,
    },
    vegetarian: {
        fontSize: 16,
    },
    si: {
        color: 'green', // Colore verde per "Si"
    },
    no: {
        color: 'red', // Colore rosso per "No"
    },
});

export default SchedaProdotto;