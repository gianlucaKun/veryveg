import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Scanner from '@/Components/scanner';

//in questa pagina ci sta lo scanner per scannerizzare codici a barre

export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <Scanner/>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  }
})