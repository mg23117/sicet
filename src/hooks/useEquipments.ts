import { useEffect, useState } from 'react';
import { getEquipments } from '../services/EquipmentStorage';
import { type Equipment } from '../types/Equipment';

export function useEquipments() {
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    const loadEquipments = () => {
        setEquipments(getEquipments());
    }

    useEffect(() => {
        loadEquipments();
        // Esto es para estar pendiente de cuando hagan cambios en el localStorage
        // como cuando otra pestaña o componente modifique los datos
        // o sea, como podemos y en resumen se ejecuta cuando hay un evento storage
        const handleChangeStorage = (e: StorageEvent) => {
            if (e.key === "equipments") {
                loadEquipments();
            }
        };

        window.addEventListener(`storage`, handleChangeStorage);
        return () => {
            window.removeEventListener('storage', handleChangeStorage);
        };
    }, []);

    return { equipments, refreshEquipments: loadEquipments };
}