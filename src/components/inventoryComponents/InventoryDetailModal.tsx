// Componente para mostrar los detalles de un equipo en un modal
import type { Equipment } from "../../types/Equipment";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("invetory");
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-bodyBgSeg rounded-xl w-full max-w-2xl border border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">

                    <h2 className="text-2xl font-bold text-bodyTxtMain">
                        {t("detailsEq")}
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
                        label={t("id")}
                        value={equipment.id}
                    />

                    <DetailItem
                        label={t("categoryLbl")}
                        value={equipment.category}
                    />

                    <DetailItem
                        label={t("nameEq")}
                        value={equipment.name}
                    />

                    <DetailItem
                        label={t("serialNum")}
                        value={equipment.serialNumber}
                    />

                    <DetailItem
                        label={t("statusLbl")}
                        value={equipment.status}
                    />

                    <DetailItem
                        label={t("branchLbl")}
                        value={equipment.branch}
                    />

                    <DetailItem
                        label={t("date")}
                        value={equipment.purchaseDate}
                    />

                    <DetailItem
                        label={t("price")}
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
            <p className="text-sm text-bodyTxtThird">
                {label}
            </p>

            <p className="text-bodyTxtMain font-medium">
                {value}
            </p>
        </div>
    );
}

export default DetailModal;