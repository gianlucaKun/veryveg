import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';

interface descrizioneProps {
  prodotto: object;
}

const Descrizione : React.FC <descrizioneProps> = ({prodotto}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
    <View style={styles.arrow}/>
    <Pressable
      onPress={toggleExpand}
      style={[styles.container, expanded && styles.expandedContainer]}
    >
      <Text
        style={[styles.descrizione, expanded && styles.expandedText]}
        numberOfLines={expanded ? undefined : 3} 
        ellipsizeMode="tail" 
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
    </Pressable>
    </View>
  );
};

export default Descrizione;

const styles = StyleSheet.create({
  container: {
    height: 65, 
    overflow: 'hidden', 
    backgroundColor: 'gray', 
    padding: 10, 
    borderRadius: 15,
  },
  expandedContainer: {
    height: 'auto', 
    backgroundColor: 'gray', 
  },
  descrizione: {
    color: 'white',
  },
  expandedText: {
    color: 'white', 
  },
  arrow:{
    height: 20,
    width: 20,
    backgroundColor: 'gray',
    zIndex: 1,
    transform: [{ rotate: '-45deg' }],
    position: 'relative',
    top: 10,
    left: Dimensions.get('window').width/2 - 15
  },
});