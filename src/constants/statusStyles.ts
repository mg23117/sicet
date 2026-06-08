import L from "leaflet";

export const STATUS_STYLES: Record<string, string> = {
    Operativo: 'bg-green-100 text-green-800',
    'En reparación': 'bg-yellow-100 text-yellow-800',
    Dañado: 'bg-red-100 text-red-800',
    'Fuera de servicio': 'bg-gray-100 text-gray-800',
};

export const getStatusStyle = (status: string): string => {
    return STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';
};

const STATUS_COLORS: Record<string, string> = {
    Operativo: "#15803d",          // green-700
    "En reparación": "#a16207",    // yellow-700
    Dañado: "#b91c1c",             // red-700
    "Fuera de servicio": "#374151" // gray-700
};

export function createStatusMarker(
    status: string,
    selected = false
) {
    const color = STATUS_COLORS[status] ?? "#6b7280";

    const size = selected ? 42 : 32;
    const centerCircle = selected ? 5 : 4;

    return L.divIcon({
        className: "",
        html: `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="${size}"
                height="${size}"
                viewBox="0 0 24 24"
                fill="${color}"
                stroke="white"
                stroke-width="0.5"
            >
                <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/>
                <circle cx="12" cy="11" r="${centerCircle}" fill="white"/>
                style=" filter: drop-shadow(0 3px 8px rgba(0,0,0,.5));"
            </svg>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size + 5],
    });
}