import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg'; // Importa correttamente LinearGradient e Rect
import Scanner from '@/components/Scanner';

const ScansionaScreen: React.FC = () => {

  return (
    <>
      <View style={styles.container}>
      <Scanner />
      </View>
    <Svg height="100%" width="100%" style={{zIndex:-100, position: 'absolute'}}>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#F2D6FF" />
        <Stop offset="100%" stopColor="#B79FFF" />
      </LinearGradient>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height-210,
  }
});



export default ScansionaScreen;

/*
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Richiesta di autorizzazione della fotocamera</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Nessun accesso alla fotocamera</Text>
      </View>
    );
  }
*/
