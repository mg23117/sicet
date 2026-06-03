// Este hook personalizado se encarga de cargar las categorías, estados y sucursales desde archivos JSON al montar el componente. 
// Esto permite que los datos estén disponibles para los componentes que los necesiten, como el formulario de equipo o la tabla de inventario.
import { useEffect, useState } from "react";
import type { Branch } from "../../types/Branch";

function useInventoryData() {

    const [categories, setCategories] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]); // Se define el estado para almacenar las sucursales, utilizando el tipo Branch para garantizar que los datos tengan la estructura esperada


    useEffect(() => {  // Carga las categorías, estados y sucursales al montar el componente

        fetch("/data/categories.json")
            .then((response) => response.json())
            .then((data) => setCategories(data));

        fetch("/data/status.json")
            .then((response) => response.json())
            .then((data) => setStatuses(data));

        fetch("/data/branches.json")
            .then((response) => response.json())
            .then((data) => setBranches(data));

    }, []);

    return {
        categories,
        statuses,
        branches,
    };
}

export default useInventoryData;