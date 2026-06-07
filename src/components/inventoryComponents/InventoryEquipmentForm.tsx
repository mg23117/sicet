// Componente reutilizable para el formulario de creación/edición de equipos
import type React from "react";
import { useTranslation } from "react-i18next";

type Branch = {
    id: number;
    name: string;
    city: string;
    lat: number;
    lng: number;
};

type EquipmentFormProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;

    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;

    serialNumber: string;
    setSerialNumber: React.Dispatch<React.SetStateAction<string>>;

    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;

    branch: string;
    setBranch: React.Dispatch<React.SetStateAction<string>>;

    purchaseDate: string;
    setPurchaseDate: React.Dispatch<React.SetStateAction<string>>;

    price: string;
    setPrice: React.Dispatch<React.SetStateAction<string>>;

    categories: string[];
    statuses: string[];
    branches: Branch[];

    editId: string | null;

    onSubmit: () => void;
    onClose: () => void;
};

function EquipmentForm({
    name,
    setName,

    category,
    setCategory,

    serialNumber,
    setSerialNumber,

    status,
    setStatus,

    branch,
    setBranch,

    purchaseDate,
    setPurchaseDate,

    price,
    setPrice,

    categories,
    statuses,
    branches,

    editId,

    onSubmit,
    onClose,
}: EquipmentFormProps) {
    const { t } = useTranslation("inventory");
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nombre */}
            <div>
                <label className="block text-sm text-bodyTxtMain mb-2">
                    {t("nameEq")}
                </label>

                <input
                    type="text"
                    placeholder="Ej: MacBook Pro Roberto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 text-bodyTxtMain"
                />
            </div>
             {/* Categoría */}
            <div>
                <label htmlFor="equipment-name" className="block text-sm text-bodyTxtMain mb-2">
                    {t("categoryLbl")}
                </label>

                <select
                    id = "equipment-name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={` w-full mb-2 px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${category ? "text-bodyTxtMain" : "text-bodyTxtThird"}`}>
                    <option value="" disabled hidden>
                        {t("select")}
                    </option>

                    {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
            </div>
            {/* Numero de Serie */}
            <div>
                <label className="block text-sm text-bodyTxtMain mb-2">
                    {t("serialNum")}
                </label>

                <input
                    type="text"
                    placeholder="Ej: SN12345678"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 text-bodyTxtMain"
                />
            </div>
            {/* Sucursal */}
            <div>
                <label htmlFor="branch" className="block text-sm text-bodyTxtMain mb-2">
                    {t("curBranch")}
                </label>
                <select
                    id = "branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className={` w-full mb-2 px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${branch ? "text-bodyTxtMain" : "text-bodyTxtThird"}`}
                >
                    <option value="" disabled hidden>{t("select")}</option>

                    {branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                        {branch.name}
                    </option>
                    ))}
                </select>
            </div>  
             {/* Precio */}
            <div>
                <label className="block text-sm text-bodyTxtMain mb-2">
                    {t("price")}
                </label>

                <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={` w-full mb-2 px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${price ? "text-bodyTxtMain" : "text-bodyTxtThird"}`}
                />
            </div>
            {/* Estado */}
            <div>
                <label htmlFor = "status" className="block text-sm text-bodyTxtMain mb-2">
                    {t("statusLbl")}
                </label>
                <select
                    id = "status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={` w-full mb-2 px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${status ? "text-bodyTxtMain" : "text-bodyTxtThird"}`}
                >
                    <option value="" disabled hidden>{t("select")}</option>

                    {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                    ))}
                </select>
            </div>

            {/* Fecha de adquisición */}
            <div>
                <label htmlFor = "purchase-date" className="block text-sm text-bodyTxtMain mb-1">
                    {t("date")}
                </label>

                <input
                    id = "purchase-date"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className={`w-full mb-2 px-3 py-2 rounded-lg bg-bodyBgThird border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 scheme-dark ${purchaseDate ? "text-bodyTxtMain" : "text-bodyTxtThird"}`}
                />
            </div>
        </div>  
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                {/* Botón de cancelar */}
                <button
                    onClick={onClose}
                    type="button"
                    className="px-5 py-2 rounded-lg border border-gray-600 text-bodyTxtThird hover:bg-bodyBgThird">
                     {t("btnCancel")}
                </button>
                {/* Botón de envío */}
                <button
                    onClick={onSubmit}
                    className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400n"
                >
                    {editId ? t("btnUpdate") : t("btnSave")}
                </button>
            </div>
        </div>
    );
}

export default EquipmentForm;