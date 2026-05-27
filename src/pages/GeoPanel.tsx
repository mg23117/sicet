import "leaflet/dist/leaflet.css";
import { INITIAL_CENTER, DEFAULT_ZOOM, MAP_PROVIDERS, MEDIUM_ZOOM } from "../constants/mapConfig";
import { useState, useMemo, useEffect } from "react";
import { equiposMock, type Equipment } from "../data/equipment.mock";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import EquipmentPopup from "../components/EquipmentPopup";
import EquipmentDetailModal from "../components/EquipmentDatailModal";
import FitBounds from "../components/FitBounds";
import clsx from "clsx";
import { useEquipmentSearchParam } from "../hooks/useEquipmentSearchParam";

interface ChangeViewProps {
    center: [number, number];
    zoom: number;
}

// Componente para centrar la vista del mapa al seleccionar un equipo
function ChangeView({ center, zoom }: ChangeViewProps) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom, {
            animate: true,
            duration: 1.5,
        });
    }, [center, zoom, map]);

    return null;
}

export default function GeoPanel() {
    const [searchTerm, setSearchTerm] = useState("");
    const [branchFilter, setBranchFilter] = useState<string | null>("Todas");
    const [equipmentSelected, setEquipmentSelected] = useState<Equipment | null>(null);
    const [hoveredEquipmentId, setHoveredEquipmentId] = useState<string | null>(null);
    const [modalEquipment, setModalEquipment] = useState<Equipment | null>(null);

    // Metemos las sucuarsales guardadas en el mock en un set y le agregarmos la opción "Todas"
    const branches = useMemo(
        () => ["Todas", ...new Set(equiposMock.map((e) => e.branch))],
        []
    );

    // FIltro que se encarga de filtrar los equipos cuando se selecciona algún filtro o se escribe algo o las dos al mismo timepo
    const filteredEquipments = useMemo(() => {
        return equiposMock.filter((equipment) => {
            const matchBranch = branchFilter === "Todas" || branchFilter === equipment.branch;
            const matchSearch = equipment.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());

            return matchBranch && matchSearch;
        })
    },
        [searchTerm, branchFilter]
    );

    // Para quitar un equipmentSelected si el equipo seleccionado ya no está en filteredEquipments
    // Por si por ejemplo se selecciona un equipo y luego se aplica un filtro que lo excluya
    useEffect(() => {
        if (equipmentSelected && !filteredEquipments.some(e => e.id === equipmentSelected.id)) {
            setEquipmentSelected(null);
        }
    }, [filteredEquipments, equipmentSelected]);

    // El hook para poder manejar las URL y que se puedan compartir links y así
    const { setUrlEquipment } = useEquipmentSearchParam({
        equipments: equiposMock,

        // Es la función que se llama cuando la URL tenga un equipo que si sea valido
        onSelect: (e) => {
            setEquipmentSelected(e);
        }
    });

    // Para sincronizar cuando se seleccione algo con la URL
    useEffect(() => {
        setUrlEquipment(equipmentSelected);
    }, [equipmentSelected, setUrlEquipment]);

    // Método que va a sacar un popu y centrar el mapa al seleccionar un equipo del inventario
    const handleSelectedEquipment = (equipment: Equipment) => {
        if (equipmentSelected?.id === equipment.id) {
            setEquipmentSelected(null);
            setTimeout(() => setEquipmentSelected(equipment), 0);
        } else {
            setEquipmentSelected(equipment);
        }
    }

    const handleOpenModal = (equipment: Equipment) => {
        setModalEquipment(equipment);
    }

    return (
        <div className="flex h-full w-full">

            {/*E div deL mapa*/}
            <div className="flex-1 relative">
                <MapContainer
                    center={INITIAL_CENTER}
                    zoom={DEFAULT_ZOOM}
                    style={{ height: "100%", width: "100%" }}
                >
                    {/** Cambiar de vista cuando se seleccione un equipo */}
                    {equipmentSelected && (
                        <ChangeView center={[equipmentSelected.lat, equipmentSelected.lng]} zoom={MEDIUM_ZOOM} />
                    )}

                    {/** El mapa como tal */}
                    <TileLayer
                        url={MAP_PROVIDERS.voyager.url}
                        attribution={MAP_PROVIDERS.voyager.attribution}
                    />

                    <EquipmentPopup
                        filteredEquipments={filteredEquipments}
                        equipmentSelected={equipmentSelected}
                        clickEventHandler={handleSelectedEquipment}
                        onOpenModal={handleOpenModal}
                    />

                    {modalEquipment && (
                        <EquipmentDetailModal equipment={modalEquipment} onClose={() => setModalEquipment(null)} />
                    )}

                    {!equipmentSelected && (
                        <FitBounds equipments={filteredEquipments} />
                    )}

                </MapContainer>

                {equipmentSelected && (
                    <div className="flex-1 relative">
                        {/* Botón flotante "Ver todos" */}
                        <button
                            onClick={() => { setEquipmentSelected(null), setBranchFilter("Todas") }}
                            className="absolute bottom-6 right-6 z-[1000] bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-full shadow-lg border border-gray-200 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            Ver todos
                        </button>
                    </div>
                )}
            </div>

            {/**Sección de filtros */}
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
                                onChange={(e) => setBranchFilter(e.target.value)}
                            >
                                <option value={""} disabled>Seleccione una opción:</option>
                                {branches.map((b) => {
                                    return (<option
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
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">
                        RESULTADOS DE BUSQUEDA ({filteredEquipments.length})
                    </h3>
                    <ul className="space-y-2">
                        {filteredEquipments.map((e) => {
                            return (
                                <li
                                    className={clsx("p-2 rounded-md cursor-pointer transition-colors", {
                                        "bg-blue-200 border-l-4 border-blue-600": hoveredEquipmentId === e.id,
                                        "bg-gray-50 hover:bg-blue-50": hoveredEquipmentId !== e.id
                                    }
                                    )
                                    }
                                    key={e.id}
                                    onMouseEnter={() => setHoveredEquipmentId(e.id)}
                                    onMouseLeave={() => setHoveredEquipmentId(null)}
                                    onClick={() => handleSelectedEquipment(e)}
                                >
                                    <p className="font-medium text-gray-800">{e.name}</p>
                                    <p className="text-xs text-gray-500">{e.branch} - {e.status}</p>
                                </li>
                            )
                        })}
                        {filteredEquipments.length === 0 && (
                            <li className="text-gray-500 text-sm">404: No se encontraron equipos</li>
                        )}
                    </ul>
                </div>
            </aside >

        </div >
    );
}