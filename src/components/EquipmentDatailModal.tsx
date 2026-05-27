import { type Equipment } from "../data/equipment.mock";
import { X } from "lucide-react";

export interface EquipmentDetailModalProps {
    equipment: Equipment;
    onClose: () => void;
}

export default function EquipmentDetailModal({ equipment, onClose }: EquipmentDetailModalProps) {
    return (
        <div
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Detalles del equipo
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-gray-500">Nombre</p>
                        <p className="font-medium text-gray-900">{equipment.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Sucursal</p>
                        <p className="font-medium text-gray-900">{equipment.branch}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Número de serie</p>
                        <p className="font-medium text-gray-900">
                            {equipment.serialNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Estado</p>
                        <p className="font-medium text-gray-900">
                            {equipment.status}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}