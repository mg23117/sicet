import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Equipment } from '../types/Equipment';

interface useEquipmentSearchParamProps {
    equipments: Equipment[];
    onSelect: (equipment: Equipment | null) => void;
}

export function useEquipmentSearchParam({ equipments, onSelect }: useEquipmentSearchParamProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Vamos a leer el parametro al montar la app o cuando cambie la lista de los equipos
    useEffect(() => {
        const equipmentId = searchParams.get('equipment');

        if (equipmentId) {
            const found = equipments.find(e => e.id === equipmentId);

            if (found) {
                onSelect(found);
            } else {
                // SI el ID no fue valido vamos a limpiar la URL
                setSearchParams({}, { replace: true })
            }
        } else {
            // Si no hay ningún id, lo dejamos nulo
            onSelect(null);
        }
    }, [searchParams, equipments, onSelect]);

    // Para cambiar la URL cuando alguien seleccione un equipo
    const setUrlEquipment = (equipment: Equipment | null) => {
        if (equipment) {
            setSearchParams({ equipment: equipment.id }, { replace: true });
        } else {
            setSearchParams({}, { replace: true });
        }
    };

    return { setUrlEquipment };
}