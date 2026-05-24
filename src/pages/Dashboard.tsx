const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Resumen del Sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px]">
          Tarjeta principal
        </div>

        <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px]">
          Tarjeta secundaria
        </div>

        <div className="bg-[#111827] rounded-xl p-6 shadow-lg min-h-[120px]">
          Tarjeta terciaria
        </div>
      </div>
    </div>
  );
};

export default Dashboard;