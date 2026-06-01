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

            {/**Sección de filtros */}
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
        </div >
    );
}