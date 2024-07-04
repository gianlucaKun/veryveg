import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import prodotti from '../../other/datiRandom.json';
import AggiungiProdotto from '../forms/formAddProduct';

const Scanner: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setIsScanning(false);

    const prodotto = prodotti.prodotti.find(p => p.codice === data);
    const nomeProdotto = prodotto ? prodotto.nome : null;

    if (nomeProdotto) {
      Alert.alert(
        `${nomeProdotto}`,
        `Codice a barre con identificativo ${data} è stato scansionato!`
      );
    } else {
      Alert.alert(
        'Prodotto non trovato',
        `Codice a barre tipo ${type} e con identificativo ${data} non è stato trovato. Vuoi aggiungere questo prodotto?`,
        [
          { text: 'No', onPress: () => console.log('Aggiunta prodotto annullata'), style: 'cancel' },
          { text: 'Sì', onPress: () => handleAddProduct(data) },
        ]
      );
    }
  };

  const handleAddProduct = (barcode: string) => {
    
  } 

  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Button title="x" onPress={() => setIsScanning(false)} style={styles.exitButton} />
        </View>
      ) : (
        <>
          <Button title="Scansiona un prodotto" onPress={() => setIsScanning(true)} />
          {scanned && <Button title="Scansiona di nuovo" onPress={() => setScanned(false)} />}
          {scannedData ? <Text>Dati scansionati: {scannedData}</Text> : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scannerContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'red',
    padding: 10,
  },
});

export default Scanner;
11