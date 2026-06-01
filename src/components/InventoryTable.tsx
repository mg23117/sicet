// Componente de presentación que muestra la lista de equipos en una tabla
// y permite ejecutar acciones de edición y eliminación 
import type { Equipment } from "../types/Equipment";


type InventoryTableProps = { // describe qué datos espera recibir InventoryTable
    equipments: Equipment[];
    onEdit: (equipment: Equipment) => void;
    onDelete: (id: string) => void;
}; 

function InventoryTable({ // desestructura las props para usarlas directamente sin tener que escribir props.equipments, props.onEdit, etc
    equipments,
    onEdit,
    onDelete,
}: InventoryTableProps){ // recibe las props con el tipo definido en InventoryTableProps, lo que garantiza que se le pasen los datos correctos y permite autocompletado y validación de tipos
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-left">
            <thead className="bg-gray-800 text-white"> {/* header de la tabla*/}
            <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Sucursal</th>
                <th className="px-4 py-3">Número de Serie</th>
                <th className="px-4 py-3">Acciones</th>
            </tr>
            </thead>

            <tbody>
            {equipments.length === 0 ? (
                <tr>
                    <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-400"
                    >
                        No hay equipos registrados. 
                    </td>
                </tr>
            ) : (
                equipments.map((equipment) => ( // iterar sobre el array de equipos y renderizar una fila por cada equipo, mostrando sus datos y los botones de acción
                <tr
                    key={equipment.id}
                    className="border-t border-gray-700 hover:bg-gray-800"
                >
                    <td className="px-4 py-3">{equipment.id}</td>

                    <td className="px-4 py-3">
                        {equipment.name}
                    </td>

                    <td className="px-4 py-3">
                        {equipment.category}
                    </td>

                    <td className="px-4 py-3">
                        {equipment.status}
                    </td>

                    <td className="px-4 py-3">
                        {equipment.branch}
                    </td>

                    <td className="px-4 py-3">
                        {equipment.serialNumber}
                    </td>

                    <td className="px-4 py-3">
                    <div className="flex gap-2"> {/*colocar los botones en la fila con espacio entre ellos*/}
                        {/* Botón de editar*/}
                        <button
                            onClick={() => onEdit(equipment)} 
                            className="px-3 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-400"
                        >
                        Editar
                        </button>
                        {/* Botón de eliminar*/}
                        <button
                            onClick={() => onDelete(equipment.id)} 
                            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                        >
                        Eliminar
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