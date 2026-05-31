// hooks/useFilteredEquipments.ts
import { useMemo } from 'react';
import { equiposMock } from '../data/equipment.mock';

export function useFilteredEquipments(
    branchFilter: string | null,
    searchTerm: string
) {
    return useMemo(() => {
        return equiposMock.filter((eq) => {
            const matchBranch = branchFilter === 'Todas' || branchFilter === eq.branch;
            const matchSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchBranch && matchSearch;
        });
    }, [equiposMock, branchFilter, searchTerm]);
}