import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import prodotti from '../other/datiRandom.json'

import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

type ProveScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Prove'>;

type Props = {
    navigation: ProveScreenNavigationProp;
  };

export default function Prove() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [isScanning, setIsScanning] = useState(false);

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
    const nomeProdotto = prodotto ? prodotto.nome : 'Prodotto non trovato';

    Alert.alert(
      'Codice a barre scansionato!',
      `Codice a barre con tipo ${type} e dati ${data} è stato scansionato! Nome prodotto: ${nomeProdotto}`
    );
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
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <Button title="Scansiona un prodotto" onPress={() => setIsScanning(true)} />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          {scannedData ? <Text>Dati scansionati: {scannedData}</Text> : null}
          <FlatList
            data={prodotti.prodotti}
            keyExtractor={item => item.codice}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Codice: {item.codice}</Text>
                <Text>Nome: {item.nome}</Text>
              </View>
            )}
          />
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
    marginTop:50
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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