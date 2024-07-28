import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, PanResponder, Animated, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SchedaProdotto from './Schede/schedaProdotto';

type BarCodeEvent = {
    type: string;
    data: string;
};

const Scanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [code, setCode] = useState<string>('Not yet scanned');


    // logica per l'animazione
    const [isSchedaUp, setIsSchedaUp] = useState<boolean>(false);
    const [schedaRaised, setSchedaRaised] = useState<boolean>(false);

    const schedaTop = useRef(new Animated.Value(Dimensions.get('window').height - 350)).current;
    const screenHeight = Dimensions.get('window').height;
    const schedaHeight = 350;

    const minTop = screenHeight - schedaHeight;
    const maxTop = screenHeight - 800;
    const speedThreshold = 0.5; // Soglia di velocità per considerare il movimento rapido

    const askForCameraPermission = async () => {
        try {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        } catch (error) {
            console.error("Errore nella richiesta dei permessi:", error);
        }
    };



    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onPanResponderMove: (_, { dy }) => {
                // Nessuna azione durante il movimento, attendiamo il rilascio
            },
            onPanResponderRelease: (_, { dy, vy }) => {
                if (Math.abs(vy) > speedThreshold) {
                    let snapToPosition;
                    if (isSchedaUp) {
                        snapToPosition = dy < 0 ? minTop : maxTop;
                    } else {
                        snapToPosition = dy > 0 ? minTop : maxTop;
                    }

                    // Aggiorna lo stato prima dell'animazione
                    const isRaised = snapToPosition === minTop;
                    setSchedaRaised(isRaised);
                    setIsSchedaUp(isRaised);

                    Animated.spring(schedaTop, {
                        toValue: snapToPosition,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    //logica scanner
    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
        setScanned(true);
        setCode(data);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Richiesta di permesso per la fotocamera</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Nessun accesso alla fotocamera</Text>
                <Button title={'Consenti Fotocamera'} onPress={askForCameraPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <>
                <Button title={'Tocca per scansionare di nuovo'} onPress={() => setScanned(false)} />
                <Animated.View
                style={[styles.scheda, { top: schedaTop }]}
                {...panResponder.panHandlers}
            >
                <ScrollView>
                    <SchedaProdotto codice={code} isComplete={schedaRaised} />
                </ScrollView>
                </Animated.View>
                </>
            )}
        </View>
    );
};

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
    },
    scheda: {
        position: 'absolute',
    },
});