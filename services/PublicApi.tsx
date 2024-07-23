import { ProductFoodFacts } from "@/models/products"


const base_url = "https://world.openfoodfacts.org/api/v3/product/"


export const getProductByBarCodePublicApi = async (barcode: string): Promise<ProductFoodFacts> => { 
    try {
        const response = await fetch(`${base_url}${barcode}.json`)
        console.log("questa è la response", response);
        return await response.json()
    } catch (error) {
        console.error("Error fetching product by barcode: ", error)
        throw error
    }
 
}