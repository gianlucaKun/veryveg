import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import prodotti from '../other/datiRandom.json';
import AggiungiProdotto from '../components/forms/formAddProduct';
import BottoneCustom from '../components/custom/buttonCustom/buttonCutom';

export default function Prove() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState<string>('');
    const [isScanning, setIsScanning] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const annulla = () => {
        setShowAddProduct(false);
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData(data);
        setIsScanning(false);

        // Cerca il prodotto corrispondente nel JSON
        const prodotto = prodotti.prodotti.find(p => p.codice === data);
        const nomeProdotto = prodotto ? prodotto.nome : null;

        if (nomeProdotto) {
            Alert.alert(
                'Codice a barre scansionato!',
                `Codice a barre con tipo ${type} e dati ${data} è stato scansionato! Nome prodotto: ${nomeProdotto}`
            );
        } else {
            Alert.alert(
                'Prodotto non trovato',
                `Codice a barre con tipo ${type} e dati ${data} non è stato trovato. Vuoi aggiungere questo prodotto?`,
                [
                    { text: 'No', onPress: () => console.log('Aggiunta prodotto annullata'), style: 'cancel' },
                    { text: 'Sì', onPress: () => setShowAddProduct(true) },
                ]
            );
        }
    };

    if (hasPermission === null) {
        return <Text>Richiesta di autorizzazione della fotocamera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Nessun accesso alla fotocamera</Text>;
    }

    return (
        <View style={styles.container}>
            {isScanning ? (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <BottoneCustom testo={'x'} onPress={() => setIsScanning(false)} stile={styles.exitButton}/>
                </>
            ) : (
                <>
                    <Button title="Scansiona un prodotto" onPress={() => setIsScanning(true)} />
                    {scanned && <Button title={'Scansiona di nuovo'} onPress={() => setScanned(false)} />}
                    {scannedData ? <Text>Dati scansionati: {scannedData}</Text> : null}
                    {showAddProduct && <AggiungiProdotto codice={scannedData} event={annulla} />}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    exitButton : {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 30,
        right: 30
    }
});

/*
import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    alert(`Codice a barre con tipo ${type} e dati ${data} è stato scansionato!`);
  };

  if (hasPermission === null) {
    return <Text>Richiesta di autorizzazione della fotocamera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Nessun accesso alla fotocamera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {scannedData ? <Text>Dati scansionati: {scannedData}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/