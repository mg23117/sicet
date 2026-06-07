
import {
  FaLaptop,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBan
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getEquipments } from "../services/EquipmentStorage";
import { useTranslation } from "react-i18next";

const Dashboard = () => {

  const { t } = useTranslation("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    operativo: 0,
    reparacion: 0,
    dañados: 0,
    FueradeServicio: 0,
  });

  useEffect(() => {

    const worker = new Worker(
      new URL("../workers/statsWorker.ts", import.meta.url),
      { type: "module" }
    );

    const equipments = getEquipments();

    worker.postMessage(equipments);

    worker.onmessage = (event) => {
      setStats(event.data);
    };

    return () => {
      worker.terminate();
    };

  },
    []);
  const totalEquipos = stats.total || 1;

  const operativoPorcentaje =
    (stats.operativo / totalEquipos) * 100;

  const reparacionPorcentaje =
    (stats.reparacion / totalEquipos) * 100;

  const dañadosPorcentaje =
    (stats.dañados / totalEquipos) * 100;

  const FueradeServicioPorcentaje =
    (stats.FueradeServicio / totalEquipos) * 100;

  const donutStyle = {
    background: `conic-gradient(
    #22c55e 0% ${operativoPorcentaje}%,
    #facc15 ${operativoPorcentaje}% ${operativoPorcentaje + reparacionPorcentaje
      }%,
    #a855f7 ${operativoPorcentaje + reparacionPorcentaje
      }% ${operativoPorcentaje +
      reparacionPorcentaje +
      dañadosPorcentaje
      }%,
    #ef4444 ${operativoPorcentaje +
      reparacionPorcentaje +
      dañadosPorcentaje
      }% ${operativoPorcentaje +
      reparacionPorcentaje +
      dañadosPorcentaje +
      FueradeServicioPorcentaje
      }%
  )`,
  };
  return (

    <div>
      <h1 className="text-3xl font-bold mb-6 text-bodyTxtMain">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-bodyBgThird rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">
          {/* Primera Tarjeta*/}
          <div>
            <p className="text-bodyTxtThird text-sm uppercase">
              {t("totalEquipment")}
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {stats.total}
            </h2>
          </div>
          <FaLaptop className="text-5xl text-cyan-400" />

        </div>


        {/* Segunda tarjeta */}
        <div className="bg-bodyBgThird rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">

          <div>
            <p className="text-bodyTxtThird text-sm uppercase">
              {t("inRepair")}
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {stats.reparacion}
            </h2>
          </div>

          <FaTools className="text-5xl text-yellow-400" />

        </div>

        {/* Tercera tarjeta */}
        <div className="bg-bodyBgThird rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">

          <div>
            <p className="text-bodyTxtThird text-sm uppercase">
              {t("operational")}
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {stats.operativo}
            </h2>
          </div>

          <FaCheckCircle className="text-5xl text-green-400" />
        </div>
      </div>

      {/* Sección inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">


        <div className="bg-bodyBgThird rounded-2xl p-6 shadow-lg lg:col-span-2">

          <h2 className="text-xl text-bodyTxtMain font-semibold mb-4">
            {t("equipmentStatus")}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-bodyTxtThird">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              {t("operational")}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              {t("inRepair")}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              {t("damaged")}
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              {t("outOfService")}
            </div>
          </div>

          {/* Donut */}
          <div className="flex justify-center items-start pt-2 h-[220px]">
            <div
              className="w-56 h-56 rounded-full relative shadow-lg"
              style={donutStyle}>
              <div
                className="absolute w-32 h-32 rounded-full bg-[#111827] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                <p className="text-xs text-gray-400 uppercase">
                  {t("total")}
                </p>

                <h2 className="text-3xl font-bold text-white">
                  {stats.total}
                </h2>

              </div>
            </div>
          </div>

        </div>

        {/* Tarjetas laterales */}
        <div className="flex flex-col gap-6">

          <div className="bg-bodyBgThird rounded-2xl p-7 min-h-[140px] shadow-lg flex justify-between items-center">
            <div>
              <p className="uppercase text-sm text-purple-400">{t("damaged")}</p>
              <h2 className="text-4xl font-bold text-purple-400 mt-2">
                {stats.dañados}
              </h2>
            </div>

            <FaExclamationTriangle className="text-4xl text-purple-400" />
          </div>

          <div className="bg-bodyBgThird rounded-2xl p-7 min-h-[140px] shadow-lg flex justify-between items-center">
            <div>
              <p className="uppercase text-sm text-red-400">{t("outOfService")}</p>
              <h2 className="text-4xl font-bold text-red-400 mt-2">
                {stats.FueradeServicio}
              </h2>
            </div>

            <FaBan className="text-4xl text-red-400" />
          </div>
        </div>

      </div>

    </div>
  );
};



export default Dashboard;