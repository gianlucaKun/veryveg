import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { loginUser } from '@/services/AccountAPI'; // Importa la funzione di login

const Home = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Stato per indicare il caricamento

  const toggleLoginModal = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      // Qui puoi gestire la risposta, come salvare il token nel dispositivo
      Alert.alert('Login effettuato con successo', `Benvenuto, ${email}`);
      toggleLoginModal(); // Chiudi il modale dopo il login
    } catch (error) {
      Alert.alert('Errore di login', 'Email o password non corretti');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Benvenuto in VeryVeg</Text>

      <Button title="Login" onPress={toggleLoginModal} />

      <Modal visible={isLoginVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Login</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title={loading ? "Loading..." : "Effettua Login"}
              onPress={handleLogin}
              disabled={loading}
            />
            <Button title="Chiudi" onPress={toggleLoginModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
