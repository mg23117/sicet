import "leaflet/dist/leaflet.css";
import { INITIAL_CENTER, DEFAULT_ZOOM, MAP_PROVIDERS, MEDIUM_ZOOM } from "../constants/mapConfig";
import { useState, useEffect } from "react";
import type { Equipment } from '../types/Equipment';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import EquipmentPopup from "../components/EquipmentPopup";
import EquipmentDetailModal from "../components/EquipmentDatailModal";
import FitBounds from "../components/FitBounds";
import { useEquipmentSearchParam } from "../hooks/useEquipmentSearchParam";
import MapFilters from "../components/MapFilters";
import ResetViewButton from "../components/ResetViewButton";
import { useFilteredEquipments } from "../hooks/useFilteredEquipments";
import { useEquipmentsWithCoords } from "../hooks/useEquipmentsWithCoords";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("geopanel");
    const [searchTerm, setSearchTerm] = useState("");
    const [branchFilter, setBranchFilter] = useState<string>("Todas");
    const [equipmentSelected, setEquipmentSelected] = useState<Equipment | null>(null);
    const [hoveredEquipmentId, setHoveredEquipmentId] = useState<string | null>(null);
    const [modalEquipment, setModalEquipment] = useState<Equipment | null>(null);

    // Llamamos el hook que se encarga de darnos los equipos con coordenadas, las coordenadas de las sucursales y las sucursales disponibles con equipos
    const { equipmentsWithCoords, branchCoordMap, availableBranches } = useEquipmentsWithCoords();

    // FIltro que se encarga de filtrar los equipos cuando se selecciona algún filtro o se escribe algo o las dos al mismo timepo
    const filteredEquipments = useFilteredEquipments(equipmentsWithCoords, branchFilter, searchTerm);

    // Para quitar un equipmentSelected si el equipo seleccionado ya no está en filteredEquipments
    // Por si por ejemplo se selecciona un equipo y luego se aplica un filtro que lo excluya
    useEffect(() => {
        if (equipmentSelected && !filteredEquipments.some(e => e.id === equipmentSelected.id)) {
            setEquipmentSelected(null);
        }
    }, [filteredEquipments, equipmentSelected]);

    // El hook para poder manejar las URL y que se puedan compartir links y así
    const { setUrlEquipment } = useEquipmentSearchParam({
        equipments: equipmentsWithCoords,
        // Es la función que se llama cuando la URL tenga un equipo que si sea valido
        onSelect: (e) => {
            setEquipmentSelected(e);
        }
    });

    // Para sincronizar cuando se seleccione algo con la URL
    useEffect(() => {
        setUrlEquipment(equipmentSelected);
    }, [equipmentSelected, setUrlEquipment]);

    // Método que va a sacar un popup y centrar el mapa al seleccionar un equipo del inventario
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

    const handleResetView = () => {
        setEquipmentSelected(null);
        setBranchFilter("Todas");
    };
    
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-bodyBgMain px-5 py-5 overflow-hidden">
            <div className="flex h-full min-h-0 gap-5 flex-col lg:flex-row">
                <div className="flex-1 min-w-0 flex flex-col gap-5">

                    <h1 className="text-2xl font-semibold tracking-wide text-bodyTxtMain">
                        {t("title")}
                    </h1>

                    {/*E div deL mapa*/}
                    <div className="flex-1 min-h-0 relative rounded-[28px] overflow-hidden shadow-2xl border border-white/5 bg-bodyBgMain">
                        <MapContainer
                            center={INITIAL_CENTER}
                            zoom={DEFAULT_ZOOM}
                            style={{ height: "100%", width: "100%" }}
                        >
                            {/** Cambiar de vista cuando se seleccione un equipo */}
                            {equipmentSelected && (
                                <ChangeView center={[branchCoordMap.get(equipmentSelected.branch)!.lat, branchCoordMap.get(equipmentSelected.branch)!.lng]} zoom={MEDIUM_ZOOM} />
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
                                branchCoordMap={branchCoordMap}
                            />

                            {modalEquipment && (
                                <EquipmentDetailModal equipment={modalEquipment} onClose={() => setModalEquipment(null)} />
                            )}

                            {!equipmentSelected && (
                                <FitBounds equipments={filteredEquipments} branchCoordMap={branchCoordMap} />
                            )}

                        </MapContainer>
                        {/** Es el botón que aparece SOLO CUANDO está un equipo seleccionado y permite ver todos los disponibles en el mapa */}
                        <ResetViewButton onClick={handleResetView} visible={!!equipmentSelected} />
                    </div>
                </div>

                {/**Sección de filtros */}
                <div className="w-full lg:w-[360px] shrink-0 min-h-0">
                    <MapFilters
                        branchFilter={branchFilter}
                        onBranchFilterChange={setBranchFilter}
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        equipments={filteredEquipments}
                        branches={availableBranches}
                        hoveredEquipmentId={hoveredEquipmentId}
                        onHoverEquipment={setHoveredEquipmentId}
                        onSelectEquipment={handleSelectedEquipment}
                    />
                </div>
            </div>
        </div>
    );
}