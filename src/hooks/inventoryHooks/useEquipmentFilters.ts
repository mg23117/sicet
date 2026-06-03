// Este hook personalizado se encarga de filtrar la lista de equipos en función de los criterios de búsqueda y los filtros seleccionados por el usuario.
import type { Equipment } from "../../types/Equipment";

type FilterParams = { // Define un tipo para los parámetros que se le pasan al hook de filtrado, incluyendo la lista de equipos y los valores de los filtros
    equipments: Equipment[];
    searchTerm: string;
    categoryFilter: string;
    statusFilter: string;
    branchFilter: string;
};

function useEquipmentFilters({
    equipments,
    searchTerm,
    categoryFilter,
    statusFilter,
    branchFilter,
}: FilterParams) {

    return equipments.filter((equipment) => {

        const matchesSearch =
            equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || // includes verifica si el término de búsqueda está contenido dentro del nombre del equipo, ignorando mayúsculas y minúsculas
            equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "" || // Si está vacío, muestra todas las categorías
            equipment.category === categoryFilter; //si no está vacío, muestra solo los equipos que coincidan con la categoría seleccionada

        const matchesStatus =
            statusFilter === "" ||
            equipment.status === statusFilter;

        const matchesBranch =
            branchFilter === "" ||
            equipment.branch === branchFilter;

        return ( // El equipo debe cumplir TODOS los filtros al mismo tiempo para ser incluido en el resultado final
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesBranch
        );
    });
}

export default useEquipmentFilters;