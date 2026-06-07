// Componente para el modal de confirmación de eliminación de equipos
import { useTranslation } from "react-i18next";

type DeleteModalProps = {
    isOpen: boolean;
    equipmentName: string;
    onConfirm: () => void;
    onClose: () => void;
};

function DeleteModal({
    isOpen,
    equipmentName,
    onConfirm,
    onClose,
}: DeleteModalProps) {

    if (!isOpen) return null;
    const { t } = useTranslation("inventory");
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-bodyBgSeg rounded-xl w-full max-w-md border border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">

                    <h2 className="text-xl font-bold text-bodyTxtMain">
                        {t("deleteEq")}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-pink-400 hover:text-pink-300 text-xl"
                    >
                        ✕
                    </button>

                </div>

                {/* Body */}
                <div className="p-6">

                    <p className="text-bodyTxtThird mb-2">
                        {t("deleteQst")}
                    </p>

                    <p className="text-bodyTxtSeg font-semibold">
                        {equipmentName}
                    </p>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-600 text-bodyTxtThird hover:bg-bodyBgThird transition"
                    >
                       {t("btnCancel")}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
                    >
                        {t("delete")}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteModal;