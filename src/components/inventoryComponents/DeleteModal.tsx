// Componente para el modal de confirmación de eliminación de equipos

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

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-gray-800 rounded-xl w-full max-w-md border border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">

                    <h2 className="text-xl font-bold text-white">
                        Eliminar equipo
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

                    <p className="text-gray-300 mb-2">
                        ¿Está seguro que desea eliminar este equipo?
                    </p>

                    <p className="text-cyan-400 font-semibold">
                        {equipmentName}
                    </p>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteModal;