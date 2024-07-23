import { ProductFoodFacts, prodottoveryveg } from "@/models/products";
import axios from 'axios';

const base_url_public = "https://world.openfoodfacts.org/api/v3/product/";
//const baseUrl = "http://192.168.1.53:8080/product"; //per Andriy
const base_url_internal = "http://192.168.1.9:8080/product"; // per Gianluca

// Funzione per ottenere il prodotto dall'API pubblica
export const getProductByBarCodePublicApi = async (barcode: string): Promise<ProductFoodFacts | null> => { 
    try {
        const response = await fetch(`${base_url_public}${barcode}.json`);
        if (response.ok) {
            console.log("questa è la response", response);
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by barcode from public API: ", error);
        return null;
    }
}

// Funzione per ottenere il prodotto dal database interno
export const getProductByBarCodeInternalApi = async (barcode: string): Promise<prodottoveryveg | null> => {
    try {
        const response = await axios.get(`${base_url_internal}?barcode=${barcode}`);
        return response.data as prodottoveryveg;
    } catch (e) {
        console.error("Errore durante il recupero del prodotto attraverso il barcode: " + barcode);
        return null;
    }
}

// Funzione principale per cercare il prodotto
export const getProductByBarCode = async (barcode: string): Promise<prodottoveryveg | null> => {
    // Prima cerca nell'API pubblica
    const productPublic = await getProductByBarCodePublicApi(barcode);
    if (productPublic) {
        // Trasforma il risultato dell'API pubblica in formato compatibile con il tuo database interno, se necessario
        const product: prodottoveryveg = {
            name: productPublic.code,
            barcode: productPublic.code,
            description: "",
            vegan: false, // Dovrai mappare queste informazioni dal risultato dell'API pubblica se disponibili
            vegetarian: false,
            ingredients: []
        };
        return product;
    }

    // Se non trovato nell'API pubblica, cerca nel database interno
    const productInternal = await getProductByBarCodeInternalApi(barcode);
    if (productInternal) {
        return productInternal;
    }

    // Se non trovato in nessuna delle due fonti, restituisce null
    return null;
}

export const getAll_product = async () :  Promise<prodottoveryveg[]> => {
    const response = await axios.get(base_url_internal+'/getAllProduct');
    return response.data;
}

export const addProduct = async (product: prodottoveryveg): Promise<prodottoveryveg> => {
    try {
        console.log ("product: ", product);
        const response = await axios.post(`${base_url_internal}/add`, product);
        return response.data as prodottoveryveg;
    } catch (e) {
        console.error("Errore durante l'aggiunta del prodotto: " + JSON.stringify(product));
        throw e;
    }
}