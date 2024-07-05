import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Product, getProduct, addProduct } from '../../services/BarcodeAPI';
import AddProductForm from '../forms/AddProductForm';

const Scanner: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    setIsScanning(false);

    try {
      const product = await getProduct(data);
      if (product) {
        console.log(product);
        Alert.alert(
          `${product}`,
          `Codice a barre con identificativo ${data} è stato scansionato!`
        );
      } else {
        setProductNotFound(true);
      }
    } catch (error) {
      console.error('Errore durante la ricerca del prodotto:', error);
      Alert.alert('Errore', 'Si è verificato un problema durante la ricerca del prodotto.' + data);
    }
  };

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const addedProduct = await addProduct(newProduct);
      console.log('Prodotto aggiunto:', addedProduct);
      setProductNotFound(false);
      setShowAddProduct(false);
      Alert.alert('Prodotto Aggiunto', `Il prodotto con barcode ${scannedData} è stato aggiunto.`);
    } catch (error) {
      console.error('Errore durante l\'aggiunta del prodotto:', error);
      Alert.alert('Errore', 'Si è verificato un problema durante l\'aggiunta del prodotto.');
    }
  };

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
          <View style={styles.buttonContainer}>
            <Button
              title="Scansiona un prodotto"
              onPress={() => setIsScanning(true)}
              color="#FFFFFF" // Colore del testo del pulsante
            />
          </View>
          {scanned && (
            <View style={styles.buttonContainer}>
              <Button
                title="Scansiona di nuovo"
                onPress={() => setScanned(false)}
                color="#FFFFFF" // Colore del testo del pulsante
              />
            </View>
          )}
          {scannedData ? <Text>Dati scansionati: {scannedData}</Text> : null}
          {productNotFound && (
            <AddProductForm
              code={scannedData}
              onAddProduct={handleAddProduct}
              onCancel={() => setProductNotFound(false)}
            />
          )}
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
    backgroundColor: '#3FA34D',
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
  scannerButton: {
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 10, 
    width: '80%',
  },
});


export default Scanner;
