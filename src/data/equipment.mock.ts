export interface Equipment {
    id: string;
    name: string;
    serialNumber: string;
    branch: string;
    lat: number;
    lng: number;
    status: string;
}

export const equiposMock: Equipment[] = [
    {
        id: "1",
        name: "MacBook Pro Roberto",
        branch: "Sucursal Norte",
        lat: 13.6929,
        lng: -89.2182,
        status: "Activo",
        serialNumber: "LT123",
    },
    {
        id: "2",
        name: "Dell UltraSharp 27\"",
        branch: "San Salvador",
        lat: 13.6929,
        lng: -89.2182,
        status: "Activo",
        serialNumber: "LT123",
    },
    {
        id: "3",
        name: "Samsung S21+ José",
        branch: "Sonsonate",
        lat: 13.7195,
        lng: -89.7242,
        status: "En reparación",
        serialNumber: "LT123",
    },
    {
        id: "4",
        name: "Dafado",
        branch: "Ahuachapán",
        lat: 13.9215,
        lng: -89.8464,
        status: "Activo",
        serialNumber: "LT123",
    },
    {
        id: "5",
        name: "Monitor LG 24\"",
        branch: "Acajutla",
        lat: 13.5907,
        lng: -89.8335,
        status: "Activo",
        serialNumber: "LT123",
    },
    {
        id: "6",
        name: "iPad Ana",
        branch: "Santa Tecla",
        lat: 13.6764,
        lng: -89.2797,
        status: "Inactivo",
        serialNumber: "LT123",
    },
];