import { Marker, Popup } from "react-leaflet";
import type { Equipment } from '../types/Equipment';
import { useEffect, useRef } from "react";
import L from "leaflet";
import EquipmentPopupContent from "./EquipmentPopupContent";

interface EquipmentPopupProps {
    filteredEquipments: Equipment[];
    equipmentSelected: Equipment | null;
    clickEventHandler: (equipment: Equipment) => void;
    onOpenModal: (equipment: Equipment) => void;
    branchCoordMap: Map<string, { lat: number; lng: number }>;
}

export default function EquipmentPopup({ filteredEquipments, clickEventHandler, equipmentSelected, onOpenModal, branchCoordMap, }: EquipmentPopupProps) {
    const markerRef = useRef<Record<string, L.Marker>>({});

    // Para que se abra solo automaticamente el popu cuando se cambia la selección
    useEffect(() => {
        if (!equipmentSelected) return;

        const marker = markerRef.current[equipmentSelected.id];

        if (marker) {
            marker.openPopup();
        }
    }, [equipmentSelected])

    return (
        <>
            {filteredEquipments.map((e) => {
                const coords = branchCoordMap.get(e.branch);
                if (!coords) return null; // no mostrar si no hay coordenadas

                return (
                    <Marker
                        key={e.id}
                        position={[coords.lat, coords.lng]}
                        ref={(ref) => {
                            if (ref) markerRef.current[e.id] = ref;
                        }}
                        eventHandlers={{ click: () => clickEventHandler(e) }}
                    >
                        <Popup minWidth={200} maxWidth={1000}>
                            <EquipmentPopupContent equipment={e} onOpenModal={onOpenModal} />
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
}