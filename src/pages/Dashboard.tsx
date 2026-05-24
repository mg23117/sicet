
import {
  FaLaptop,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBan
} from "react-icons/fa";

const Dashboard = () => {
const stats = {
  total: 512,
  operativos: 480,
  mantenimiento: 18,
  dañados: 14,
  descontinuados: 7,
};
  return (
   
   <div>
      <h1 className="text-3xl font-bold mb-6">
        Panel de Resumen del Sistema
        </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

         <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">
            {/* Primera Tarjeta*/}
          <div>
            <p className="text-gray-400 text-sm uppercase">
              Equipos Totales
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              {stats.total}
            </h2>
          </div>
          <FaLaptop className="text-5xl text-cyan-400" />
          
        </div>

      
          {/* Segunda tarjeta */}
          <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">

          <div>
            <p className="text-gray-400 text-sm uppercase">
              En mantenimiento
            </p>

           <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {stats.mantenimiento}
            </h2>
          </div>

          <FaTools className="text-5xl text-yellow-400" />
        
        </div>

        {/* Tercera tarjeta */}
    <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px] flex justify-between items-center">

          <div>
            <p className="text-gray-400 text-sm uppercase">
              Operativos
            </p>

             <h2 className="text-4xl font-bold text-green-400 mt-2">
              {stats.operativos}
            </h2>
          </div>

          <FaCheckCircle className="text-5xl text-green-400" />
        </div>
      </div>
{/* Sección inferior */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

  {/* Donut card (ocupa 2 columnas en lg) */}
  <div className="bg-[#111827] rounded-2xl p-6 shadow-lg lg:col-span-2">

    <h2 className="text-xl font-semibold mb-4">
      Estado de los Equipos
    </h2>

    <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-300">

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-400" />
        Operativos
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        Mantenimiento
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-purple-400" />
        Dañados
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        Descontinuados
      </div>
    </div>

    {/* Donut */}
    <div className="flex flex-col flex-1 justify-center items-center h-[260px]">
      <div
        className="
          w-64 h-64 rounded-full
          bg-[conic-gradient(#22c55e_0%_60%,#facc15_60%_80%,#a855f7_80%_90%,#ef4444_90%_100%)]
          relative
        "
      >
        <div
          className="
            absolute w-24 h-24 rounded-full bg-[#111827]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          "
        />
      </div>
    </div>

  </div>

  {/* Cards laterales */}
  <div className="flex flex-col gap-6">

    <div className="bg-[#111827] rounded-2xl p-7 min-h-[140px] shadow-lg flex justify-between items-center">
      <div>
        <p className="uppercase text-sm text-purple-400">Dañados</p>
        <h2 className="text-4xl font-bold text-purple-400 mt-2">
          {stats.dañados}
        </h2>
      </div>

      <FaExclamationTriangle className="text-4xl text-purple-400" />
    </div>

    <div className="bg-[#111827] rounded-2xl p-7 min-h-[140px] shadow-lg flex justify-between items-center">
      <div>
        <p className="uppercase text-sm text-red-400">Descontinuados</p>
        <h2 className="text-4xl font-bold text-red-400 mt-2">
          {stats.descontinuados}
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