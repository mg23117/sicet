import type { LatLngExpression } from "leaflet";

export const INITIAL_CENTER: LatLngExpression = [13.6929, -89.2182];
export const DEFAULT_ZOOM = 13;
export const MEDIUM_ZOOM = 15;

export const MAP_PROVIDERS = {
    voyager: {
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
};