// qui vengono fatte tutte le chiamate http per quanto riguarda i prodotti

import { prodottoveryveg } from "../models/products"
import axios from 'axios'

const baseUrl = "http://192.168.1.53:8080/product"; //per Andriy
//const baseUrl = "http://192.168.1.9:8080/product/getAllProduct"; //per Gianluca

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