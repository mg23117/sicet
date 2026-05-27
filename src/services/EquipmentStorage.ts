import type { Equipment } from "../types/Equipment";

const STORAGE_KEY = "equipments"; // Clave para almacenar los equipos en el localStorage

// Cargar equipos desde el localStorage (leerlos) y devolverlos como un array de objetos Equipment
export const getEquipments = () : Equipment[] => { 
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data): []; // Si hay datos, parsearlos de JSON a un array de objetos Equipment, si no, devolver un array vacío
    } catch (error) {
        console.error("Error loading equipments", error);
        return[];
    }
};

// Guardar equipos en el localStorage (escribirlos) como una cadena JSON
export const saveEquipments = (equipments: Equipment[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(equipments)) // Convertir el array de objetos Equipment a una cadena JSON antes de guardarlo
    } catch (error) {
        console.log("Error saving equipments:", error);
    }
}

// Agregar un nuevo equipo al localStorage
export const addEquipment = (equipment : Equipment) => {
    const equipments = getEquipments();

    const updateEquipments = [...equipments, equipment];
    
    saveEquipments(updateEquipments);
}

// Actualizar un equipo existente en el localStorage
export const updateEquipment = (updatedEquipment : Equipment) => {
    const equipments = getEquipments();

    const updatedEquipments = equipments.map((equipment) =>
        equipment.id === updatedEquipment.id
        ? updatedEquipment
        : equipment
    );

    saveEquipments(updatedEquipments);
};

// Eliminar un equipo del localStorage por su ID
export const deleteEquipment = (id : string) => {
    const equipments = getEquipments();

    const filteredEquipments = equipments.filter( 
        (equipment) => equipment.id !== id
    );

    saveEquipments(filteredEquipments);
}

// Generar ID de los equipos.
export const generateEquipmentId = (): string => {
    const equipments = getEquipments();

    if(equipments.length === 0) {
        return "EQ001";
    }

    const lastEquipment = equipments[equipments.length - 1];

    const lastIdNumber = parseInt(lastEquipment.id.replace("EQ", ""));

    const newIdNumber = lastIdNumber + 1;

    return `EQ${newIdNumber.toString().padStart(3, "0")}`;
};
