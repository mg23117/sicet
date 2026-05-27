import { type Equipment } from "../data/equipment.mock";
import { Building2, Barcode } from 'lucide-react';
import clsx from "clsx";

interface EquipmentPopupContentProps {
    equipment: Equipment;
    onOpenModal: (equipment: Equipment) => void;
}

export default function EquipmentPopupContent({ equipment, onOpenModal }: EquipmentPopupContentProps) {
    const statusClass = (equipment: Equipment) => {
        return clsx(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            {
                'bg-green-100 text-green-800': equipment.status === 'Activo',
                'bg-red-100 text-red-800': equipment.status === 'Inactivo',
                'bg-yellow-100 text-yellow-800': equipment.status === 'En reparación'
            }
        )
    }


    return (
        <>
            <div className="min-w-[240px] max-w-sm p-2">
                <div className="flex items-start gap-3">
                    {/**TODO: Luego mejor debo poner un SVG para que se vea más profesional. Pero ahorita solo un icnono */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg font-bold">
                            {equipment.name.charAt(0)}
                        </div>
                    </div>

                    {/** Este es el contenido principal del popup */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                            <h3 className="text-sm font-semibold text-gray-900">{equipment.name}</h3>
                            <span className={statusClass(equipment)}>
                                {equipment.status}
                            </span>
                        </div>

                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                            <p className="flex items-center gap-1">
                                <span>
                                    <Building2 size={20} />
                                </span>

                                {equipment.branch}
                            </p>
                            <p className="flex items-center gap-1">
                                <span>
                                    <Barcode size={20} />
                                </span>
                                Serial: {equipment.serialNumber}
                            </p>
                        </div>

                        <button
                            onClick={() => onOpenModal(equipment)}
                            className="mt-3 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium py-1.5 px-3 rounded-md transition-colors"
                        >
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}