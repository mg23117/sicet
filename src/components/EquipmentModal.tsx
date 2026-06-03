// Componente para mostrar un modal (ventana emergente) con información o formularios relacionados con el equipo
//import type { Equipment } from "../types/Equipment";

type EquipmentModalProps = { // describe qué tipos de datos espera recibir EquipmentModal
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

function EquipmentModal({ // desestructura las props para usarlas directamente sin tener que escribir props.isOpen, props.title, etc
    isOpen,
    title,
    children,
    onClose,
}: EquipmentModalProps) {

if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada (devuelve null)

return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl w-full max-w-2xl p-6 border border-gray-700">

            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                <h2 className="text-2xl font-bold text-white">
                {title}
                </h2>

                <button
                onClick={onClose}
                className="text-pink-400 hover:text-pink-300 text-xl"
                >
                ✕
                </button>
            </div>
            {/* Renderiza cualquier contenido que se le pase al modal, como el formulario de creación/edición de equipos, permitiendo que el modal sea reutilizable para diferentes propósitos solo cambiando su contenido */}
            {children} 
            </div>
        </div>
    );
}

export default EquipmentModal;