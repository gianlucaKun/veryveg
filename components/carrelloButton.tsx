import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import React from 'react'

import { AntDesign } from '@expo/vector-icons'

interface LikeProps {
    codice : string,
    idUtente: string,
    style?: ViewStyle;
}

const CarrelloButton : React.FC <LikeProps> = ({codice, idUtente, style}) => {

    //aggiungere logica del cart
    const handleCartButton = () => {

    };

  return (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'lightgray' : 'white',
            },
            styles.button,
            style
          ]}
          onPress={() => handleCartButton()}
        >
            <AntDesign name="shoppingcart" size={40} color="black" />
        </Pressable>
      );
    };
    
    const styles = StyleSheet.create({
      button: {
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 100,
      }
    });

export default CarrelloButton;