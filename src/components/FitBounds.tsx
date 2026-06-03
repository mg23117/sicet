
import { useEffect } from "react";
import type { Equipment } from '../types/Equipment';
import { useMap } from "react-leaflet";
import L from "leaflet";

interface FitBoundsProps {
    equipments: Equipment[];
    branchCoordMap: Map<string, { lat: number, lng: number }>;
}

export default function FitBounds({ equipments, branchCoordMap }: FitBoundsProps) {
    const map = useMap();

    useEffect(() => {
        if (equipments.length === 0) return;

        // Para recalcular los limites del mapa cada vez que hay nuevos equipos, cordenadas validas o cuando cambia el map en general
        // luego lo filtra para pasarle el [] sin nulls y para indicarle a TS que va en un formato valido de {number, number} y que no se queje
        const bounds = L.latLngBounds(
            equipments.map(e => {
                const coord = branchCoordMap.get(e.branch);
                return coord ? [coord.lat, coord.lng] : null;
            }).filter(Boolean) as [number, number][]
        );

        if (!bounds.isValid()) return;

        map.fitBounds(bounds, {
            // un poco de padding para que no quede ningun marker al borde y que se vea mal
            paddingTopLeft: [70, 70],
            paddingBottomRight: [120, 120],
            maxZoom: 14,
        });
    }, [equipments, branchCoordMap, map])

    return null;
} 