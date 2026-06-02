// Componente principal de inventario que administra el estado de los equipos,
// carga datos, maneja las operaciones CRUD y coordina la interacción entre los componentes.
import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import InventoryTable from "../components/InventoryTable";


import { // Importa funciones para manejar el almacenamiento de equipos en localStorage
    getEquipments,
    generateEquipmentId,
    addEquipment,
    updateEquipment,
    deleteEquipment,

} from "../services/EquipmentStorage";

type Branch = { // type para representar la estructura real de cada objeto dentro del JSON, permite autocompletado, validación de tipos y detección de errores en compile time
    id: number;
    name: string; 
    city: string;
    lat: number;
    lng: number;
};

function Inventory() { 

    const [categories, setCategories] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]); // Se define el estado para almacenar las sucursales, utilizando el tipo Branch para garantizar que los datos tengan la estructura esperada
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    // Inputs del formulario:
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [status, setStatus] = useState("");
    const [branch, setBranch] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [price, setPrice] = useState("");
    const [editId, setEditId] = useState<string | null>(null); // Guarda qué equipo estamos editando, si es null estamos creando y si tiene id estamos editando 
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");

    useEffect(() => {  // Carga las categorías, estados, sucursales y equipos al montar el componente
        fetch("/data/categories.json")
        .then((response) => response.json())
        .then((data) => setCategories(data));

        fetch("/data/status.json")
        .then((response) => response.json())
        .then((data) => setStatuses(data));

        fetch("/data/branches.json")
        .then((response) => response.json())
        .then((data) => setBranches(data));

        const storedEquipments = getEquipments();
        setEquipments(storedEquipments);
    }, []);

    // AGREGAR NUEVO EQUIPO
    const handleAddEquipment = () => {
        if (
            !name ||
            !category ||
            !serialNumber ||
            !status ||
            !branch ||
            !purchaseDate ||
            !price
        ) {
        alert("Todos los campos son obligatorios");
        return;
        }

        const newEquipment : Equipment = {
            id: generateEquipmentId(),
            name,
            category,
            serialNumber,
            status,
            branch,
            purchaseDate,
            price: Number(price),
        };

        addEquipment(newEquipment); // Guarda

        setEquipments(getEquipments()); // Actualiza pantalla
    
        // Limpia formulario
        setName("");
        setCategory("");
        setSerialNumber("");
        setStatus("");
        setBranch("");
        setPurchaseDate("");
        setPrice("");

    }

    // Al presionar editar: llena el formulario automáticamente. 
    const handleEditEquipment = (equipment: Equipment) => {
        setEditId(equipment.id);

        setName(equipment.name);
        setCategory(equipment.category);
        setSerialNumber(equipment.serialNumber);
        setStatus(equipment.status);
        setBranch(equipment.branch);
        setPurchaseDate(equipment.purchaseDate);
        setPrice(equipment.price.toString());
    };

    // EDITAR UN EQUIPO 
    const handleUpdateEquipment = () => {
        if (
            !name ||
            !category ||
            !serialNumber ||
            !status ||
            !branch ||
            !purchaseDate ||
            !price
            ) {
                alert("Todos los campos son obligatorios");
            return;
        }

        if (!editId) return;

        const updatedEquipment : Equipment = { // Crea un nuevo objeto con los datos actualizados, manteniendo el mismo ID
            id: editId,
            name,
            category,
            serialNumber,
            status,
            branch,
            purchaseDate,
            price: Number(price),
        };

        updateEquipment(updatedEquipment); // Actualiza el equipo en el localStorage

        setEquipments(getEquipments()); // Refresca pantalla

        setEditId(null); 

        // Limpia formulario
        setName("");
        setCategory("");
        setSerialNumber("");
        setStatus("");
        setBranch("");
        setPurchaseDate("");
        setPrice("");
    }

    // BORRAR UN EQUIPO
    const handleDeleteEquipment = (id : string) => {

        const confirmDelete = window.confirm (
            "Desea eliminar este equipo?"
        );

        if (!confirmDelete) return;

        deleteEquipment(id); // Elimina el equipo del localStorage
        setEquipments(getEquipments()); // Actualiza pantalla
    };

    // FILTRAR EQUIPOS
    const filteredEquipments = equipments.filter((equipment) => {
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

    return (
        <div className="container mt-4">
            {/* TÍTULO */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Inventario de Equipos
                </h1>
                <p className="text-gray-400 mt-1">
                    Gestiona los equipos tecnológicos de las sucursales.
                </p>
            </div>
            {/* TOOLBAR - para buscador y filtros */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
                {/* BUSCADOR */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar equipo por nombre o número de serie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                        w-full
                        px-4
                        py-3
                        rounded-lg
                        bg-gray-900
                        border
                        border-gray-600
                        text-white
                        placeholder-gray-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-cyan-400
                        "
                    />
            </div>
            {/* FILTROS + BOTÓN */}
            <div className="flex flex-col lg:flex-row gap-3 justify-between">
                 {/* FILTROS */}
                <div className="flex flex-col md:flex-row gap-3 flex-1">
                    {/* CATEGORÍA */}
                    <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="
                        px-3
                        py-2
                        rounded-lg
                        bg-gray-900
                        border
                        border-gray-600
                        text-white
                    "
                    >
                    <option value="">Todas las categorías</option> // Si el filtro está vacío, muestra todas las categorías, de lo contrario, muestra solo los equipos que coincidan con la categoría seleccionada

                    {categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                    </select>
                    {/* ESTADO */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="
                            px-3
                            py-2
                            rounded-lg
                            bg-gray-900
                            border
                            border-gray-600
                            text-white
                        "
                        >
                        <option value="">Todos los estados</option>

                        {statuses.map((status) => (
                            <option key={status} value={status}>
                            {status}
                            </option>
                        ))}
                    </select>
                    {/* SUCURSAL */}
                    <select
                        value={branchFilter}
                        onChange={(e) => setBranchFilter(e.target.value)}
                        className="
                            px-3
                            py-2
                            rounded-lg
                            bg-gray-900
                            border
                            border-gray-600
                            text-white
                        "
                        >
                        <option value="">Todas las sucursales</option>

                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.name}>
                            {branch.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* BOTÓN AGREGAR */}
                <button className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
                    + Agregar Equipo
                </button>
            </div>
            </div>
            {/* FORMULARIO VIEJO OCULTO TEMPORALMENTE */}
            <div className="hidden">
                <input
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    style={{ color: "white" }}
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    type="text"
                    placeholder="Número de serie"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />

                <input
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                />

                <input
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none
                    focus:ring-2 focus:ring-cyan-400"
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <select
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Seleccione categoría</option>

                    {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                    ))}
                </select>

                <select
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Seleccione estado</option>

                    {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                    ))}
                </select>

                <select
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >
                    <option value="">Seleccione sucursal</option>

                    {branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                        {branch.name}
                    </option>
                    ))}
                </select>

                <button 
                    className="w-full py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition" 
                    onClick={
                        editId
                        ? handleUpdateEquipment
                        : handleAddEquipment
                    }
                >
                {editId ? "Actualizar equipo" : "Agregar equipo"}
                </button>
            </div>
            {/* TABLA */}
            {/* Pasa los equipos filtrados y las funciones de editar y eliminar como props al componente InventoryTable */}
            <InventoryTable
                equipments={filteredEquipments}
                onEdit={handleEditEquipment}
                onDelete={handleDeleteEquipment}
            />
        </div>
    );
}

export default Inventory;