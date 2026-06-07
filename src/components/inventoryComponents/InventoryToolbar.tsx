// Este componente representa la barra de herramientas del inventario, que incluye el buscador, los filtros y el botón para agregar un nuevo equipo.
import { Search, Plus } from "lucide-react";
import type { Branch } from "../../types/Branch";
import { useTranslation } from "react-i18next";

type InventoryToolbarProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;

    categoryFilter: string;
    setCategoryFilter: (value: string) => void;

    statusFilter: string;
    setStatusFilter: (value: string) => void;

    branchFilter: string;
    setBranchFilter: (value: string) => void;

    categories: string[];
    statuses: string[];
    branches: Branch[];

    onCreate: () => void;
};

function InventoryToolbar({
    searchTerm,
    setSearchTerm,

    categoryFilter,
    setCategoryFilter,

    statusFilter,
    setStatusFilter,

    branchFilter,
    setBranchFilter,

    categories,
    statuses,
    branches,

    onCreate,
}: InventoryToolbarProps) {
    const { t } = useTranslation("inventory");
    return (
        <div className="bg-bodyBgThird border border-gray-700 rounded-xl p-5 mb-6">

            {/* FILA SUPERIOR */}
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
                {/* BUSCADOR */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-bodyTxtMain"
                    />

                    <input
                        type="text"
                        placeholder={t("phLook")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-bodyBgSeg border border-gray-600 text-bodyTxtMain placeholder-bodyTxtThird focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                </div>

                {/* BOTÓN */}
                <button
                    onClick={onCreate}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition whitespace-nowrap">
                    <Plus size={18} />
                    {t("btnNewEq")}
                </button>
            </div>

            {/* FILTROS */}
            <div className="flex flex-col md:flex-row gap-4 items-end w-full">
                {/* CATEGORÍA */}
                <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="category-select" className="block text-bodyTxtMain font-medium mb-2">{t("categoryLbl")}</label>
                    <select
                        id="category-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-bodyBgSeg border border-gray-600 text-bodyTxtMain">
                        <option value="">
                            {t("categoryDes")}
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ESTADO */}
                <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="status-select" className="block text-bodyTxtMain font-medium mb-2">{t("statusLbl")}</label>
                    <select
                        id="status-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-bodyBgSeg border border-gray-600 text-bodyTxtMain">
                        <option value="">
                            {t("statusDes")}
                        </option>

                        {statuses.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* SUCURSAL */}
                <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="branch-select" className="block text-bodyTxtMain font-medium mb-2">{t("branchLbl")}</label>
                    <select
                        id = "branch-select"
                        value={branchFilter}
                        onChange={(e) => setBranchFilter(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-bodyBgSeg border border-gray-600 text-bodyTxtMain">
                        <option value="">
                            {t("branchDes")}
                        </option>

                        {branches.map((branch) => (
                            <option
                                key={branch.id}
                                value={branch.name}
                            >
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default InventoryToolbar;