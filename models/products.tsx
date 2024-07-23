export interface prodotto {
    codice : string;
    nome: string;
}

export interface listaProdotti {
    prodotti : prodottoveryveg[];
}

export interface prodottoveryveg {
    name: string;
    barcode?: string;
    description: string;
    vegan: boolean;
    vegetarian: boolean;
    ingredients: [];
}

export interface ProductFoodFacts {
    code: string;
    stores_tags: [];
    image_front_url: string;
}