export interface prodotto {
    codice : string;
    nome: string;
}

export interface listaProdotti {
    prodotti : prodotto[];
}

export interface prodottoveryveg {
    id?: number;
    barcode?: string;
    description: string;
    name: string;
    vegan: boolean;
    vegetarian: boolean;
}