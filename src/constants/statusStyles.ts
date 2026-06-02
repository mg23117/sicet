export const STATUS_STYLES: Record<string, string> = {
    Operativo: 'bg-green-100 text-green-800',
    'En reparación': 'bg-yellow-100 text-yellow-800',
    Dañado: 'bg-red-100 text-red-800',
    'Fuera de servicio': 'bg-gray-100 text-gray-800',
};

export const getStatusStyle = (status: string): string => {
    return STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';
};