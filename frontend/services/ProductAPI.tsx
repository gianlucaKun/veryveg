// qui vengono fatte tutte le chiamate http per quanto riguarda i prodotti

import { prodottoveryveg } from "../models/products"
import axios from "axios";

const baseUrl = "http://192.168.1.53:8080/product/getAllProduct";

export const getAll_product = async () :  Promise<prodottoveryveg[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
}