// Componente de presentación que muestra la lista de equipos en una tabla
// y permite ejecutar acciones de edición y eliminación 
import type { Equipment } from "../../types/Equipment";
import { Pencil, Trash2, Eye} from "lucide-react";

type InventoryTableProps = { // describe qué datos espera recibir InventoryTable
    equipments: Equipment[];
    onEdit: (equipment: Equipment) => void;
    onDelete: (equipment: Equipment) => void;
    onViewDetails: (equipment: Equipment) => void;
}; 

function InventoryTable({ // desestructura las props para usarlas directamente sin tener que escribir props.equipments, props.onEdit, etc
    equipments,
    onEdit,
    onDelete,
    onViewDetails,
}: InventoryTableProps){ // recibe las props con el tipo definido en InventoryTableProps, lo que garantiza que se le pasen los datos correctos y permite autocompletado y validación de tipos
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-700"> {/* overflow-x-auto para que la tabla sea scrollable horizontalmente en pantallas pequeñas */}
        <table className="w-full text-sm">
             {/* HEADER */}
                <thead className="bg-gray-900 border-b border-gray-700">

                    <tr>
                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            ID
                        </th>

                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            Nombre
                        </th>

                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            Categoría
                        </th>

                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            Estado
                        </th>

                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            Sucursal
                        </th>

                        <th className="px-5 py-4 text-left text-gray-300 font-semibold uppercase tracking-wide">
                            Serie
                        </th>

                        <th className="px-5 py-4 text-center text-gray-300 font-semibold uppercase tracking-wide">
                            Acciones
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {equipments.length === 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="px-4 py-12 text-center text-gray-400"
                            >
                                No hay equipos registrados.
                            </td>
                        </tr>
            ) : (
                equipments.map((equipment) => ( // iterar sobre el array de equipos y renderizar una fila por cada equipo, mostrando sus datos y los botones de acción
                <tr
                                key={equipment.id}
                                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"> 

                                <td className="px-5 py-4 text-cyan-400 font-medium">
                                    {equipment.id}
                                </td>
                                <td className="px-5 py-4 text-white font-medium">
                                    {equipment.name}
                                </td>
                                <td className="px-5 py-4 text-gray-300">
                                    {equipment.category}
                                </td>
                                <td className="px-5 py-4 text-gray-300">
                                    {equipment.status}
                                </td>
                                <td className="px-5 py-4 text-gray-300">
                                    {equipment.branch}
                                </td>
                                <td className="px-5 py-4 text-gray-300 font-mono">
                                    {equipment.serialNumber}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-center gap-2"> {/*colocar los botones en la fila con espacio entre ellos*/}
                                    {/* Botón de editar */}
                                        <button
                                            onClick={() => onEdit(equipment)}
                                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition">
                                            <Pencil size={16} />
                                            Editar
                                        </button>

                                        {/* Botón de eliminar */}
                                        <button
                                            onClick={() => onDelete(equipment)}
                                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-medium transition">
                                            <Trash2 size={16} />
                                            Eliminar
                                        </button>

                                        {/* Botón de detalles */}
                                        <button
                                            onClick={() => onViewDetails(equipment)}
                                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition">
                                            <Eye size={16} />
                                            Detalles
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;