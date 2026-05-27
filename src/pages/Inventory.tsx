import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";


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

    return (
        <div className="container mt-4">
            <div className="mb-4">
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
            <h1>Inventario ---------------------------------------</h1>
            <h3>Categorías</h3>
            <ul>
                {categories.map((category, index) => (
                <li key={index}>{category}</li>
                ))}
            </ul>

            <h3>Estados ---------------------------------------</h3>
            <ul>
                {statuses.map((status, index) => (
                <li key={index}>{status}</li>
                ))}
            </ul>

            <h3>Sucursales ---------------------------------------</h3>
            <ul>
                {branches.map((branch) => (
                <li key={branch.id}>
                    {branch.name} - {branch.city}
                </li>
                ))}
            </ul>

            <h3>Equipos ---------------------------------------</h3>
            <ul>
                {equipments.map((equipment) => (
                    <li key={equipment.id}>
                    {equipment.id} - {equipment.name}
                        <button
                            className="py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
                            onClick={() => handleEditEquipment(equipment)}
                        >
                            Editar
                        </button>
                        <button
                            className="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                            onClick={() => handleDeleteEquipment(equipment.id)}
                            >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inventory;