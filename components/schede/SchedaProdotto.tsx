import { View, Text, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState, useEffect}from 'react';
import SceltaEmoji from './sceltaEmoji';
import { prodottoveryveg } from '@/models/products';
import { useRouter } from 'expo-router';

interface BottoneProps {
  stile?: StyleProp<ViewStyle>;
  onClick?: () => void;
  isNew?: boolean;
  prodotto?: prodottoveryveg;
  barCode: string;
}

const SchedaProdotto : React.FC<BottoneProps> = ({stile, onClick, isNew, prodotto, barCode }) => {

  const router = useRouter();

const navigateToAddProduct = ( codice : string) => {
    router.push({
      pathname: 'aggiungi',
      params: { codice },
  }); // Naviga alla pagina nascosta
};

  const [risultato, setRisultato] = useState<string>(''); //per settare emoji

  useEffect(() =>{
    if(prodotto?.vegan && prodotto.vegetarian){
      setRisultato('ok');
    } else if (prodotto?.vegan || prodotto?.vegetarian){
      setRisultato('mmh');
    } else {
      setRisultato('nope');
    }
  },[])

  if (isNew) {
    return (
      <TouchableOpacity
        style={stile ? stile : styles.buttonContainer}
        onPress={() => barCode !== undefined ? navigateToAddProduct(barCode) : null}
      >
        <SceltaEmoji risultato={'flirt'} />
        <Text style={styles.testo}>Prodotto non presente!</Text>
      </TouchableOpacity>
    );
  } else if (prodotto?.name === undefined) {
    return (
      <TouchableOpacity style={stile ? stile : styles.buttonContainer} onPress={onClick}>
        <SceltaEmoji risultato={'?'}/>
        <Text style={styles.testo}>Barcode non valido</Text>
      </TouchableOpacity>
    );
  } else {
    return(
    <TouchableOpacity style={stile ? stile : styles.buttonContainer} onPress={onClick}>
      <SceltaEmoji risultato={risultato} colore='#926FFF'/>
      <Text style={styles.testo}>{prodotto.name}</Text>
    </TouchableOpacity>
    )
  }

};

const styles = StyleSheet.create({
  testo: {
    fontSize: 26,
    color: '#926FFF',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
});

export default SchedaProdotto;