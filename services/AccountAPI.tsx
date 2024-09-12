// AccountAPI.tsx
import axios from 'axios';

// Configura l'URL base del server backend
const baseUrl = "http://192.168.1.13:8080/jwt"; // Cambia con il tuo endpoint

// Funzione per il login dell'utente
export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { email, password });
    // Qui presumo che il token JWT sia nella proprietà `token` della risposta
    return response.data; // Ritornare la risposta che può includere token e altri dati
  } catch (error) {
    console.error("Errore durante il login:", error);
    throw error;
  }
};
