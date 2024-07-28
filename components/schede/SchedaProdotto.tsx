import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Animated, ViewStyle } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LikeButton from '../likeButton';
import CarrelloButton from '../carrelloButton';
import Listatags from '../Tags/listatags';
import ListatagsMini from '../Tags/listaTagsMini';
import Descrizione from '../descrizione';
import BottoneListaIngredienti from '../bottoneListaIngredienti';
import TagsTipologia from '../Tags/tagsTipologia';
import BottoneConfronta from '../bottoneConfronta';

interface schedaProps {
    codice: string;
    style?: ViewStyle;
    isComplete: boolean;
}

const SchedaProdotto: React.FC<schedaProps> = ({ codice, style, isComplete }) => {
    const [prodotto, setProdotto] = useState<object>({});
    const rightAnim = useRef(new Animated.Value(isComplete ? 100 : 0)).current;
    const miniInfoLeftAnim = useRef(new Animated.Value(220)).current; // Initial left position
    const miniInfoOpacityAnim = useRef(new Animated.Value(1)).current; // Initial opacity

    //implementare logica per recuperare il prodotto dal backEnd & logica


    //animazioni
    useEffect(() => {
        Animated.parallel([
            Animated.timing(rightAnim, {
                toValue: isComplete ? 100 : 0,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(miniInfoLeftAnim, {
                toValue: isComplete ? 220 : 280,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(miniInfoOpacityAnim, {
                toValue: isComplete ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            })
        ]).start();
    }, [isComplete]);


    //componenti della scheda
    return (
        <View style={[styles.container, style]}>
            <View style={styles.containerImage}>
                <Text style={styles.nomeProdotto}>Nome + {codice}</Text>
                <Animated.View style={[styles.mini_info, { left: miniInfoLeftAnim, opacity: miniInfoOpacityAnim }]}>
                  <ListatagsMini prodotto={prodotto} />
                </Animated.View>
                <Animated.View style={[styles.composizione_bottoni_immagine2, { right: rightAnim }]}>
                    <LikeButton codice={codice} idUtente='1234567890' style={styles.like} />
                    <Image
                        source={{ uri: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/1296x728-header.jpg?w=1155&h=1528' }}
                        style={styles.image}
                    />
                    <CarrelloButton codice={codice} idUtente='1234567890' style={styles.cart} />
                </Animated.View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.descrizione}>
                    <Descrizione prodotto={prodotto} />
                </View>
                <View style={styles.tags_list}>
                    <Listatags prodotto={prodotto} />
                </View>
                <View style={styles.lista_ingredienti}>
                    <BottoneListaIngredienti codice={codice} />
                </View>
                <View style={styles.tag_tipologia}>
                    <TagsTipologia prodotto={prodotto} />
                </View>
                <View style={styles.lista_ingredienti}>
                    <BottoneConfronta codice={codice} />
                </View>
            </ScrollView>
        </View>
    );
};

export default SchedaProdotto;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#ccc'
    },
    incompleteContainer: {
        backgroundColor: '#e0e0e0',
    },
    containerImage: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        padding: 20,
    },
    composizione_bottoni_immagine2: {
        backgroundColor: 'transparent',
        position: 'relative',
        height: 200,
        bottom: 40,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 1000,
    },
    nomeProdotto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    like: {
        position: 'relative',
        top: 50,
        zIndex: 1,
    },
    cart: {
        position: 'relative',
        bottom: 50,
        left: 120,
        zIndex: 1,
    },
    tags_list: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    descrizione: {
        marginHorizontal: 10,
    },
    lista_ingredienti: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    tag_tipologia: {
        backgroundColor: 'gray',
        marginTop: 10,
    },
    mini_info: {
        height: 200,
        width: 200,
        position: 'absolute',
        top: 50,
    },
});