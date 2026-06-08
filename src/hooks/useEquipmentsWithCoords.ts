import { useMemo } from 'react';
import { useEquipments } from './useEquipments';
import { useBranches } from './useBranches';

export function useEquipmentsWithCoords() {
    const { equipments } = useEquipments();
    const branches = useBranches()

    // UN map donde se guarda las coordenadas de una sucursal y se accede por medio del nombre de la sucursal
    const branchCoordMap = useMemo(() => {
        const map = new Map<string, { lat: number, lng: number }>();
        branches.forEach(b => map.set(b.name, { lat: b.lat, lng: b.lng }));
        return map;
    }, [branches]);

    // Filtramos los equipos que si tienen coordenadas (o sea, una sucursal con coordenadas)
    // y también filtramos los que no tienen coordenadas validas
    const equipmentsWithCoords = useMemo(() => {
        const missing = equipments.filter(eq => !branchCoordMap.has(eq.branch));

        if (branchCoordMap.size > 0 && missing.length) {
            console.warn("Equipos sin coordenadas:", missing);
        }

        return equipments.filter(eq => branchCoordMap.has(eq.branch));
    }, [equipments, branchCoordMap]);

    // Hacemos un set mostrando solo las sucursales que tienen equipos con coordenadas validas
    const availableBranches = useMemo(() => {
        const branchesSet = new Set(equipmentsWithCoords.map(eq => eq.branch));
        return ['Todas', ...Array.from(branchesSet).sort()];
    }, [equipmentsWithCoords]);

    return { equipmentsWithCoords, branchCoordMap, availableBranches };
}