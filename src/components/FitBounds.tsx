
import { useEffect } from "react";
import { type Equipment } from "../data/equipment.mock"
import { useMap } from "react-leaflet";
import L from "leaflet";

interface FitBoundsProps {
    equipments: Equipment[];
}

export default function FitBounds({ equipments }: FitBoundsProps) {
    const map = useMap();

    useEffect(() => {
        if (equipments.length === 0) return;

        const bounds = L.latLngBounds(
            equipments.map((e) => [e.lat, e.lng])
        );

        map.fitBounds(bounds, {
            padding: [50, 50],
        });
    }, [equipments, map])

    return null;
} 