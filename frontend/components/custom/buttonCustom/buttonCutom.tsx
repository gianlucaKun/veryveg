import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";

interface BottoneProps {
    testo: string;
    onPress: () => void;
    stile?: StyleProp<ViewStyle>; // Usiamo StyleProp per accettare stili condizionali
}

const BottoneCustom: React.FC<BottoneProps> = ({ testo, onPress, stile }) => {
    return (
        <TouchableOpacity style={[styles.button, stile]} onPress={onPress}>
            <Text style={styles.buttonText}>{testo}</Text>
        </TouchableOpacity>
    );
};

export default BottoneCustom;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

