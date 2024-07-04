import axios from "axios";

const PRODUCT_URL = "http://localhost:8080/product";

export interface Product {
    id: number;
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

export const addProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await axios.post(PRODUCT_URL, product);
        return response.data as Product;
    } catch (e) {
        console.error("Errore durante l'aggiunta del prodotto: " + JSON.stringify(product));
        throw e;
    }
}