// Componente principal de inventario que administra el estado de los equipos,
// carga datos, maneja las operaciones CRUD y coordina la interacción entre los componentes.
import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import InventoryTable from "../components/InventoryTable";
import EquipmentModal from "../components/EquipmentModal";
import EquipmentForm from "../components/EquipmentForm";
import DeleteModal from "../components/DeleteModal";
import DetailModal from "../components/DetailModal";
import toast, { Toaster } from "react-hot-toast";
import { Search, Plus } from "lucide-react";


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
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto o cerrado, se pasa como prop al componente EquipmentModal para mostrar u ocultar el modal según su valor
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Controla si el modal de detalles está abierto o cerrado
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); //
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla si el modal de eliminación está abierto o cerrado
    const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null); // Guarda el equipo que se va a eliminar

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
        if (!name || !category || !serialNumber || !status || !branch || !purchaseDate || !price) {
        toast.error("Todos los campos son obligatorios");
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
        
        toast.success("Equipo creado correctamente");
    
        // Limpia formulario
        handleOpenCreateModal();

        setIsModalOpen(false);
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

        setIsModalOpen(true);
    };

    // EDITAR UN EQUIPO 
    const handleUpdateEquipment = () => {
        if (!name || !category || !serialNumber || !status || !branch || !purchaseDate || !price) {
            toast.error("Todos los campos son obligatorios");
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

        toast.success("Equipo actualizado correctamente");

        setEditId(null); 
        
        handleOpenCreateModal(); // Limpia formulario

        setIsModalOpen(false);
    }

    // ELIMINAR UN EQUIPO
        const handleDeleteEquipment = (equipment: Equipment) => {
        setEquipmentToDelete(equipment);
        setIsDeleteModalOpen(true);
    };

    // Confirmar eliminación del equipo seleccionado en el modal de confirmación
    const confirmDeleteEquipment = () => {

    if (!equipmentToDelete) return;

    deleteEquipment(equipmentToDelete.id);

    setEquipments(getEquipments());

    toast.success("Equipo eliminado correctamente");

    setIsDeleteModalOpen(false);

    setEquipmentToDelete(null);
};

    // LIMPIAR FORMULARIO
    const handleOpenCreateModal = () => {
        setEditId(null);

        setName("");
        setCategory("");
        setSerialNumber("");
        setStatus("");
        setBranch("");
        setPurchaseDate("");
        setPrice("");

        setIsModalOpen(true);
    };

    // ABRIR MODAL DE DETALLES
    const handleViewDetails = (equipment: Equipment) => {
        setSelectedEquipment(equipment); // Guarda el equipo seleccionado para mostrar sus detalles en el modal
        setIsDetailModalOpen(true);
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
            <Toaster
                position="top-center"
                toastOptions={{
                    
                    duration: 3000,
                    style: {
                        minWidth: '400px', // Aumenta el ancho mínimo del cuadro
                        fontSize: '20px', 
                        padding: '20px', // Agrega más espacio interno
                        background: "#1f2937",
                        color: "#fff",
                        border: "1px solid #374151",
                    },
                    success: { // Icono de éxito
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        iconTheme: { // Icono de error 
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    }
                }}
            />
            {/* TÍTULO */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Inventario de Equipos
                </h1>
                <p className="text-gray-400 mt-1">
                    Gestiona los equipos tecnológicos de las sucursales.
                </p>
            </div>
            {/* TOOLBAR */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">
                {/* FILA SUPERIOR */}
                <div className="flex flex-col lg:flex-row gap-3 mb-4">
                    {/* BUSCADOR */}
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Buscar equipo por nombre o número de serie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                    </div>

                    {/* BOTÓN */}
                    <button
                        onClick={handleOpenCreateModal}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition whitespace-nowrap">
                        <Plus size={18} />
                        Nuevo Equipo
                    </button>

                </div>

                {/* FILTROS */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* CATEGORÍA */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
                        <option value="">Todas las categorías</option>

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
                        className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
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
                        className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
                        <option value="">Todas las sucursales</option>

                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.name}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* TABLA */}
            {/* Pasa los equipos filtrados y las funciones de editar y eliminar como props al componente InventoryTable */}
            <InventoryTable
                equipments={filteredEquipments}
                onEdit={handleEditEquipment}
                onDelete={handleDeleteEquipment}
                onViewDetails={handleViewDetails}
            />
            {/* MODAL PARA CREAR/EDITAR EQUIPOS */}
            <EquipmentModal // Modal para crear o editar equipos
                isOpen={isModalOpen}
                title={editId ? "Editar Equipo" : "Nuevo Equipo"}
                onClose={() => setIsModalOpen(false)}
                >
                <EquipmentForm
                    name={name}
                    setName={setName}

                    category={category}
                    setCategory={setCategory}

                    serialNumber={serialNumber}
                    setSerialNumber={setSerialNumber}

                    status={status}
                    setStatus={setStatus}

                    branch={branch}
                    setBranch={setBranch}

                    purchaseDate={purchaseDate}
                    setPurchaseDate={setPurchaseDate}

                    price={price}
                    setPrice={setPrice}

                    categories={categories}
                    statuses={statuses}
                    branches={branches}

                    editId={editId}

                    onSubmit={
                    editId
                        ? handleUpdateEquipment
                        : handleAddEquipment
                    }
                    onClose={() => setIsModalOpen(false)}
                />
            </EquipmentModal>

            {/* MODAL DE ELIMINACIÓN */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                equipmentName={equipmentToDelete?.name || ""}
                onConfirm={confirmDeleteEquipment}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setEquipmentToDelete(null);
                }}
            />
            
            {/* MODAL DE DETALLES */}
            <DetailModal
                isOpen={isDetailModalOpen}
                equipment={selectedEquipment}
                onClose={() => setIsDetailModalOpen(false)}
            />
        </div>
    );
}

export default Inventory;