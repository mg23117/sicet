import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { TbLayoutDashboard , TbBriefcase, TbMapPin, TbNut } from "react-icons/tb";

const menuItems = [
  { icon: <TbLayoutDashboard  />, name: "Panel de control", path: "/" },
  { icon: <TbBriefcase/>, name: "Inventario", path: "/inventario" },
  { icon: <TbMapPin/>, name: "Geolocalización", path: "/geolocalizacion" },
  { icon: <TbNut/>, name: "Configuración", path: "/configuracion" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-fondoSecundario border-r border-slate-800 text-textoPrincipal shadow-xl">
      <div className="flex flex-col items-center text-center px-4 py-6 border-b border-slate-700">
        <img
          src={logo}
          alt="Logo del sistema"
          className="w-16 h-16 rounded-full object-cover border-4 border-primary shadow-lg mb-4"
        />

        <h1 className="text-sm font-bold leading-tight">
          Sistema de Control de Equipos Tecnológicos
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                ? "bg-fondoPrincipal text-text-textoSecundario border-l-4 border-textoSecundario"
                : "hover:bg-fondoPrincipal hover:text-textoSecundario"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;