// hooks/useFilteredEquipments.ts
import { useMemo } from 'react';
import { type Equipment } from '../types/Equipment';

export function useFilteredEquipments(
    equipments: Equipment[],
    branchFilter: string | null,
    searchTerm: string
) {
    return useMemo(() => {
        return equipments.filter((eq) => {
            const matchBranch = branchFilter === 'Todas' || branchFilter === eq.branch;
            const matchSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

            return matchBranch && matchSearch;
        });
    }, [equipments, branchFilter, searchTerm]);
}