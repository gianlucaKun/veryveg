import React, { useState , useEffect} from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SceltaEmoji from './sceltaEmoji'; // Presumo che 'SceltaEmoji' sia un componente che mostra un'emoji basata su 'risultato'
import { prodottoveryveg } from '@/models/products';

interface SchedaProdottoTimeLineProps {
  onClick?: () => void; // Funzione da eseguire al clic del bottone
  prodotto?: prodottoveryveg; // Dati del prodotto da visualizzare
  colore?: string; // Colore di sfondo del bottone
}

const SchedaProdottoTimeLine: React.FC<SchedaProdottoTimeLineProps> = ({ onClick, prodotto, colore }) => {
  const [risultato, setRisultato] = useState<string>(''); // Stato per impostare l'emoji

  useEffect(() =>{
    if(prodotto?.vegan && prodotto.vegetarian){
      setRisultato('ok');
    } else if (prodotto?.vegan || prodotto?.vegetarian){
      setRisultato('mmh');
    } else {
      setRisultato('nope');
    }
  },[])

  return (
    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: colore }]} onPress={onClick}>
      <SceltaEmoji risultato={risultato} colore='#fff'/> 
      <Text style={styles.testo}>{prodotto?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  testo: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default SchedaProdottoTimeLine;

export const scalaColore = [
    '#926FFF',
    '#A97EFF',
    '#BC8AFF',
    '#D197FE',
    '#E0A1FE',
];
