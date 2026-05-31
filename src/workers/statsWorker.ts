import type { Equipment } from "../types/Equipment";


self.onmessage = (event) => {
  const equipments: Equipment[] = event.data;

  const stats = {
    total: equipments.length,

    operativo: equipments.filter(
      (e) => e.status === "Operativo"
    ).length,

    reparacion: equipments.filter(
      (e) => e.status === "En reparación"
    ).length,

    dañados: equipments.filter(
      (e) => e.status === "Dañado"
    ).length,

    FueradeServicio: equipments.filter(
      (e) => e.status === "Fuera de servicio"
    ).length,
  };

  self.postMessage(stats);
};

export {};