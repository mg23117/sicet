// Clase que representa un equipo en el sistema 
export interface Equipment {
    id: string;
    name: string;
    category: string;
    serialNumber: string;
    status: string;
    branch: string;
    purchaseDate: string;
    price: number;
}