import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, LogBox } from 'react-native';
import BottoneCustom from '../custom/buttonCustom/buttonCutom';

interface Prodotto {
  nome: string;
  codice: string;
}

interface AggiungiProdottoProps {
  codice: string;
  event: () => void;
}

const AggiungiProdotto: React.FC<AggiungiProdottoProps> = ({ codice, event }) => {
  const [nome, setNome] = useState<string>('');
  const [codiceProdotto, setCodiceProdotto] = useState<string>(codice);

  const handleSubmit = () => {
    const nuovoProdotto: Prodotto = { nome, codice: codiceProdotto };
    console.log('Nuovo prodotto aggiunto:', nuovoProdotto);
    // Qui puoi aggiungere la logica per aggiungere il nuovo prodotto
    // ad esempio, aggiorna lo stato globale o invialo a un server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Codice del Prodotto</Text>
      <TextInput
        style={styles.input}
        value={codiceProdotto}
        onChangeText={setCodiceProdotto}
      />
      <Text style={styles.label}>Nome del Prodotto</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
      />
      <BottoneCustom testo={'Aggiungi'} onPress={handleSubmit} />
      <BottoneCustom testo={'Annulla'} onPress={event} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eee',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AggiungiProdotto;
