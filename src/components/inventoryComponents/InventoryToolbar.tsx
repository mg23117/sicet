// Este componente representa la barra de herramientas del inventario, que incluye el buscador, los filtros y el botón para agregar un nuevo equipo.
import { Search, Plus } from "lucide-react";
import type { Branch } from "../../types/Branch";

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

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 mb-6">

            {/* FILA SUPERIOR */}
            <div className="flex flex-col lg:flex-row gap-3 mb-4">
                {/* BUSCADOR */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar equipo por nombre o número de serie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"/>
                </div>

                {/* BOTÓN */}
                <button
                    onClick={onCreate}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition whitespace-nowrap">
                    <Plus size={18} />
                    Nuevo Equipo
                </button>
            </div>

            {/* FILTROS */}
            <div className="flex flex-col md:flex-row gap-3">
                {/* CATEGORÍA */}
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
                    <option value="">
                        Todas las categorías
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

                {/* ESTADO */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
                    <option value="">
                        Todos los estados
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

                {/* SUCURSAL */}
                <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white">
                    <option value="">
                        Todas las sucursales
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
    );
}

export default InventoryToolbar;