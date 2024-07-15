import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View, Animated, Easing, Vibration } from 'react-native';
import Bottone from './custom/bottone';
import React, { useState, useEffect, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import GuideCamera from '@/assets/cameraGuide/guideCamera';
import SchedaProdotto from './schede/SchedaProdotto';
import SchedaProdottoTimeLine, { scalaColore } from './schede/SchedaProdottoTimeline';

import { getProductByBarCode } from '@/services/ProductAPI';
import { prodotto, prodottoveryveg } from '@/models/products';

const Scanner: React.FC = () => {
  const [permission, setPermission] = useState<boolean | null>(null);
  const [scanner, setScanner] = useState<boolean>(false);
  const [prodotto, setProdotto] = useState<prodottoveryveg>();
  const [camera, setCamera] = useState<boolean>(true);
  const [barCode, setBarCode] = useState<string>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [dataB, setData] = useState<string>();

  const [lista, setLista] = useState<prodottoveryveg[]>([]); //lista ultimi codici scansionati
  const [addingProduct, setAddingProduct] = useState(false);

  const scrollViewHeight = useRef(new Animated.Value(0)).current;

  // Animated values for height, marginBottom, and opacity transitions
  const heightAnim = useRef(new Animated.Value(0)).current;
  const marginAnim = useRef(new Animated.Value(10)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: camera ? 200 : 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(marginAnim, {
          toValue: camera ? 10 : 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(scrollViewHeight, {
          toValue: camera ? 360 : 560,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ]),
      Animated.timing(opacityAnim, {
        toValue: camera ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start();
  }, [camera, scrollViewHeight, heightAnim, marginAnim, opacityAnim]);

  if (permission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Richiesta di autorizzazione della fotocamera</Text>
      </View>
    );
  }
  if (permission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Nessun accesso alla fotocamera</Text>
      </View>
    );
  }

  const handleBarCodeScanner = async ({ type, data }: { type: string; data: string }) => {
    if (type.startsWith('org.gs1.EAN')) {
      // Verifica se il codice a barre scansionato è diverso da quello già memorizzato
      if (data !== barCode) {
        // Blocco aggiunta prodotto per un breve periodo
        if (addingProduct) {
          return; // Esce se stiamo già aggiungendo un prodotto
        }
  
        setAddingProduct(true); // Imposta il flag di aggiunta prodotto
  
        try {
          const product = await getProductByBarCode(data);
          Vibration.vibrate(100); // Vibra per 100 millisecondi
          if (product) {
            setLista(prevLista => [...prevLista, product]);
            setProdotto(product);
            setBarCode(data);
            setData(data); // Imposta il codice a barre trovato
            setNotFound(false);
          } else {
            if (!notFound) {
              setNotFound(true);
              setProdotto(undefined);
              setBarCode(data);
              setData(data); // Imposta il codice a barre trovato
            }
          }
        } finally {
          // Resetta il flag di aggiunta prodotto dopo un breve ritardo
          setTimeout(() => {
            setAddingProduct(false);
          }, 1000); // Tempo in millisecondi per evitare nuove aggiunte rapide
        }
      }
    } else {
      setProdotto(undefined);
      setBarCode(undefined);
    }
  };

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Animated.ScrollView
        style={[styles.scroll, { height: scrollViewHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {lista.reverse().map((p, index) => (
          <SchedaProdottoTimeLine key={index} prodotto={p} colore={scalaColore[index >= scalaColore.length ? scalaColore.length - 1 : index]}/>
        ))}
      </Animated.ScrollView>
      <View style={styles.container}>
        <SchedaProdotto prodotto={prodotto} isNew={notFound} barCode={dataB ? dataB : 'nessun codice a barre'}/>
        <Animated.View style={[styles.barCodeBox, { height: heightAnim, marginBottom: marginAnim }]}>
          {camera && <BarCodeScanner onBarCodeScanned={handleBarCodeScanner} style={StyleSheet.absoluteFillObject} />}
        </Animated.View>
        {camera ? (
          <>
            <Animated.View style={{ opacity: opacityAnim }}>
              <GuideCamera />
            </Animated.View>
            <Bottone
              testo='Chiudi fotocamera'
              icona={<Feather name="camera-off" size={36} color="#926FFF" />}
              onClick={() => setCamera(false)}
            />
          </>
        ) : (
          <Bottone
            testo='Inizia a scansionare'
            icona={<Feather name="camera" size={36} color="#926FFF" />}
            onClick={() => setCamera(true)}
          />
        )}
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  barCodeBox: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.9,
    overflow: 'hidden',
    borderRadius: 35,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#926FFF',
    padding: 10,
    borderRadius: 35,
  },
  scroll:{
    width: Dimensions.get('window').width*0.9,
    flexDirection: 'column',
    position:'relative',
  },
});
