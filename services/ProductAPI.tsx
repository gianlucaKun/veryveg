// qui vengono fatte tutte le chiamate http per quanto riguarda i prodotti

import { prodottoveryveg } from "../models/products"
import axios from 'axios'

//const baseUrl = "http://192.168.1.53:8080/product"; //per Andriy
const baseUrl = "http://192.168.1.11:8080/product"; //per Gianluca

export const getAll_product = async () :  Promise<prodottoveryveg[]> => {
    const response = await axios.get(baseUrl+'/getAllProduct');
    return response.data;
}

export const getProductByBarCode = async (barcode : string): Promise<prodottoveryveg> => {
    try {
        const response = await axios.get(`${baseUrl}?barcode=${barcode}`);
        return response.data as prodottoveryveg;
    } catch (e) {
        console.error("errore durante il recupero del prodotto attraverso il barcode: " + barcode);
        throw e;
    }
}

export const getProductFromApi = async (barcode: string) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      
      if (!response.ok) {
        // Log l'errore
        console.error(`API Error: ${response.statusText}`);
        return null;
      }
      
      const data = await response.json();
  
      if (data && data.product) {
        return data;
      } else {
        // Log se il prodotto non è stato trovato
        console.warn(`Product not found for barcode: ${barcode}`);
        return null;
      }
    } catch (error) {
      // Log errori di rete o di parsing
      console.error(`Error fetching product: ${barcode}`);
      return null;
    }
  };

export const addProduct = async (product: prodottoveryveg): Promise<prodottoveryveg> => {
    try {
        console.log ("product: ", product);
        const response = await axios.post(`${baseUrl}/add`, product);
        return response.data as prodottoveryveg;
    } catch (e) {
        console.error("Errore durante l'aggiunta del prodotto: " + JSON.stringify(product));
        throw e;
    }
}