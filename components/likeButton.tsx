import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

interface LikeProps {
  codice: string;
  idUtente: string;
  style?: ViewStyle;
}

const LikeButton: React.FC<LikeProps> = ({ codice, idUtente, style }) => {
  // Aggiungere logica del like
  const handleLikeButton = () => {
    // Logica del like
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightgray' : 'white',
        },
        styles.button,
        style,
      ]}
      onPress={handleLikeButton}
    >
      <AntDesign name="heart" size={40} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    width: '100%',
  },
});

export default LikeButton;