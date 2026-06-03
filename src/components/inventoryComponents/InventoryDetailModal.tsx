// Componente para mostrar los detalles de un equipo en un modal
import type { Equipment } from "../../types/Equipment";

type DetailModalProps = {
    isOpen: boolean;
    equipment: Equipment | null;
    onClose: () => void;
};

function DetailModal({
    isOpen,
    equipment,
    onClose,
}: DetailModalProps) {

    if (!isOpen || !equipment) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">

                    <h2 className="text-2xl font-bold text-white">
                        Detalles del equipo
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-pink-400 hover:text-pink-300 text-2xl"
                    >
                        ✕
                    </button>

                </div>

                {/* Body */}
                <div className="p-6 grid grid-cols-2 gap-5">

                    <DetailItem
                        label="ID"
                        value={equipment.id}
                    />

                    <DetailItem
                        label="Categoría"
                        value={equipment.category}
                    />

                    <DetailItem
                        label="Nombre"
                        value={equipment.name}
                    />

                    <DetailItem
                        label="Número de serie"
                        value={equipment.serialNumber}
                    />

                    <DetailItem
                        label="Estado"
                        value={equipment.status}
                    />

                    <DetailItem
                        label="Sucursal"
                        value={equipment.branch}
                    />

                    <DetailItem
                        label="Fecha de adquisición"
                        value={equipment.purchaseDate}
                    />

                    <DetailItem
                        label="Precio"
                        value={`$${equipment.price}`}
                    />

                </div>

            </div>

        </div>
    );
}

type DetailItemProps = {
    label: string;
    value: string | number;
};

function DetailItem({
    label,
    value,
}: DetailItemProps) {

    return (
        <div>
            <p className="text-sm text-gray-400">
                {label}
            </p>

            <p className="text-white font-medium">
                {value}
            </p>
        </div>
    );
}

export default DetailModal;