import axios from "axios";

//const PRODUCT_URL = "http://192.168.1.9:8080/product";
const PRODUCT_URL = "http://192.168.1.53:8080/product";

export interface Product {
    name: string;
    barcode: string;
    description: string;
    vegan: boolean;
    vegetarian: boolean;
}

export const getProduct = async (barcode): Promise<Product> => {
    try {
        const response = await axios.get(`${PRODUCT_URL}?barcode=${barcode}`);
        return response.data as Product;
    } catch (e) {
        console.error("errore durante il recupero del prodotto attraverso il barcode: " + barcode);
        throw e;
    }
}
/*
export const testApi = async () => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/test`);
        return response ;
    } catch (e) {
        console.error("errore durante il test api", e);
        throw e;
    }
}*/


export const addProduct = async (product: Product): Promise<Product> => {
    try {
        console.log ("product: ", product);
        const response = await axios.post(`${PRODUCT_URL}/add`, product);
        return response.data as Product;
    } catch (e) {
        console.error("Errore durante l'aggiunta del prodotto: " + JSON.stringify(product));
        throw e;
    }
}