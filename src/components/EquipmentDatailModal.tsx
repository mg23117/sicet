import type { Equipment } from '../types/Equipment';
import { useTranslation } from 'react-i18next';

export interface EquipmentDetailModalProps {
    equipment: Equipment;
    onClose: () => void;
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}

export default function EquipmentDetailModal({ equipment, onClose }: EquipmentDetailModalProps) {
    const { t } = useTranslation("geopanel");
    return (
        <div
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
            onClick={onClose}
        >
            <div
                className="bg-bodyBgSeg rounded-xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-bodyTxtMain">
                        {t("detailsEq")}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        X
                    </button>
                </div>

                {/**Los campos que muestran los detalles el equipo */}
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-bodyTxtThird">{t("name")}</p>
                        <p className="font-medium text-bodyTxtMain">{equipment.name}</p>
                    </div>

                    <div>
                        <p className="text-bodyTxtThird">{t("branch")}</p>
                        <p className="font-medium text-bodyTxtMain">{equipment.branch}</p>
                    </div>

                    <div>
                        <p className="text-bodyTxtThird">{t("serialNum")}</p>
                        <p className="font-medium text-bodyTxtMain">
                            {equipment.serialNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-bodyTxtThird">{t("Estado")}</p>
                        <p className="font-medium text-bodyTxtMain">
                            {equipment.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-bodyTxtThird">{t("date")}</p>
                        <p className="font-medium text-bodyTxtMain">
                            {formatDate(equipment.purchaseDate)}
                        </p>
                    </div>

                    <div>
                        <p className="text-bodyTxtThird">{t("price")}</p>
                        <p className="font-medium text-bodyTxtMain">
                            {equipment.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    {t("btnClose")}
                </button>
            </div>
        </div>
    );
}