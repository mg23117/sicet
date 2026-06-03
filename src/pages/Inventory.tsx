// Vista principal de gestión de inventario.
// Administra las operaciones CRUD de equipos, filtros de búsqueda,
// modales de interacción y sincronización de datos con localStorage.

import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import InventoryTable from "../components/inventoryComponents/InventoryTable";
import EquipmentModal from "../components/inventoryComponents/InventoryEquipmentModal";
import EquipmentForm from "../components/inventoryComponents/InventoryEquipmentForm";
import DeleteModal from "../components/inventoryComponents/DeleteModal";
import DetailModal from "../components/inventoryComponents/InventoryDetailModal";
import toast, { Toaster } from "react-hot-toast";
import useEquipmentForm from "../hooks/inventoryHooks/useEquipmentForm";
import InventoryToolbar from "../components/inventoryComponents/InventoryToolbar";
import useEquipmentFilters from "../hooks/inventoryHooks/useEquipmentFilters";
import useInventoryData from "../hooks/inventoryHooks/useInventoryData";


import { // Importa funciones para manejar el almacenamiento de equipos en localStorage
    getEquipments,
    generateEquipmentId,
    addEquipment,
    updateEquipment,
    deleteEquipment,
} from "../services/EquipmentStorage";

function Inventory() { 

    // HOOKS personalizados
    const {categories, statuses, branches,} = useInventoryData(); // Carga las categorías, estados y sucursales desde archivos JSON utilizando el hook personalizado useInventoryData
    const {name,setName,
        category, setCategory,
        serialNumber, setSerialNumber,
        status, setStatus,
        branch, setBranch,
        purchaseDate, setPurchaseDate,
        price, setPrice,
        editId, setEditId,
        resetForm, } = useEquipmentForm();

    // ESTADOS (useState)
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto o cerrado, se pasa como prop al componente EquipmentModal para mostrar u ocultar el modal según su valor
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Controla si el modal de detalles está abierto o cerrado
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); //
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controla si el modal de eliminación está abierto o cerrado
    const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null); // Guarda el equipo que se va a eliminar

    // useEffect para cargar los equipos desde localStorage al montar el componente y cada vez que se actualiza la lista de equipos
    useEffect(() => {
        setEquipments(getEquipments());
    }, []);

    // FUNCIONES PARA MANEJAR LAS OPERACIONES CRUD Y LA INTERACCIÓN CON LOS MODALES
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
        
        handleOpenCreateModal(); // Limpia formulario

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

        // Crea un nuevo objeto con los datos actualizados, manteniendo el mismo ID
        const updatedEquipment : Equipment = { id: editId, name, category, serialNumber, status, branch, purchaseDate, price: Number(price) };

        updateEquipment(updatedEquipment); // Actualiza el equipo en el localStorage

        setEquipments(getEquipments()); // Refresca pantalla

        toast.success("Equipo actualizado correctamente");
        
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
        resetForm();
        setIsModalOpen(true);
    };

    // ABRIR MODAL DE DETALLES
    const handleViewDetails = (equipment: Equipment) => {
        setSelectedEquipment(equipment); // Guarda el equipo seleccionado para mostrar sus detalles en el modal
        setIsDetailModalOpen(true);
    };


    // FILTRAR EQUIPOS 
    const filteredEquipments = useEquipmentFilters({
        equipments,
        searchTerm,
        categoryFilter,
        statusFilter,
        branchFilter,
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
            {/* TOOLBAR */}
            <InventoryToolbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}

                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}

                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}

                branchFilter={branchFilter}
                setBranchFilter={setBranchFilter}

                categories={categories}
                statuses={statuses}
                branches={branches}

                onCreate={handleOpenCreateModal}
            />
            
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
            
            {/* TOASTER PARA NOTIFICACIONES */}
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
                    error: { // Icono de error 
                        iconTheme: { 
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    }
                }}
            />
        </div>
    );
}

export default Inventory;