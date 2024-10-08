export interface prodotto {
    codice : string;
    nome: string;
}

export interface listaProdotti {
    prodotti : prodottoveryveg[];
}
export interface Ingredient {
    name: string;
}
export interface prodottoveryveg {
    name: string;
    barcode?: string;
    description: string;
    vegan: boolean;
    vegetarian: boolean;
    ingredients:Ingredient[];
}