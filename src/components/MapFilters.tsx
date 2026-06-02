import { clsx } from "clsx";
import type { Equipment } from '../types/Equipment';

interface MapFiltersProps {
    branchFilter: string | null;
    onBranchFilterChange: (value: string) => void;
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    equipments: Equipment[];
    branches: string[];
    hoveredEquipmentId: string | null;
    onHoverEquipment: (id: string | null) => void;
    onSelectEquipment: (equipment: Equipment) => void;
}

export default function MapFilters({
    branchFilter,
    onBranchFilterChange,
    searchTerm,
    onSearchTermChange,
    equipments,
    branches,
    hoveredEquipmentId,
    onHoverEquipment,
    onSelectEquipment,
}: MapFiltersProps) {
    return (
        <aside className="w-80 bg-white border-r border-gray-200 shadow-md flex flex-col z-10">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">FILTROS AVANZADOS</h2>
                <div className="mt-3 space-y-3">
                    {"Filtro por sucursal"}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sucursal</label>
                        <select
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={branchFilter}
                            onChange={(e) => onBranchFilterChange(e.target.value)}
                        >
                            <option value={""} disabled>Seleccione una opción:</option>
                            {branches.map((b) => {
                                return (
                                    <option
                                        key={b}
                                        value={b}
                                    >
                                        {b}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Buscar equipo</label>
                        <input
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder:text-gray-500"
                            type="text"
                            placeholder="Ej: MacBook Air"
                            value={searchTerm}
                            onChange={(e) => onSearchTermChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                    RESULTADOS DE BUSQUEDA ({equipments.length})
                </h3>
                <ul className="space-y-2">
                    {equipments.map((e) => {
                        return (
                            <li
                                className={clsx("p-2 rounded-md cursor-pointer transition-colors", {
                                    "bg-blue-200 border-l-4 border-blue-600": hoveredEquipmentId === e.id,
                                    "bg-gray-50 hover:bg-blue-50": hoveredEquipmentId !== e.id
                                }
                                )
                                }
                                key={e.id}
                                onMouseEnter={() => onHoverEquipment(e.id)}
                                onMouseLeave={() => onHoverEquipment(null)}
                                onClick={() => onSelectEquipment(e)}
                            >
                                <p className="font-medium text-gray-800">{e.name}</p>
                                <p className="text-xs text-gray-500">{e.branch} - {e.status}</p>
                            </li>
                        )
                    })}
                    {equipments.length === 0 && (
                        <li className="text-gray-500 text-sm">404: No se encontraron equipos</li>
                    )}
                </ul>
            </div>
        </aside >
    );
}