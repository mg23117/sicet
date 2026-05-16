import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const menuItems = [
  { name: "Panel de control", path: "/" },
  { name: "Inventario", path: "/inventario" },
  { name: "Geolocalización", path: "/geolocalizacion" },
  { name: "Configuración", path: "/configuracion" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-slate-800 text-slate-300">
      <div className="flex flex-col items-center text-center px-4 py-6 border-b border-slate-700">
        <img
          src={logo}
          alt="Logo del sistema"
          className="w-16 h-16 rounded-full object-cover border-4 border-primary shadow-lg mb-4"
        />

        <h1 className="text-sm font-bold text-textMain leading-tight">
          Sistema de Control de Equipos Tecnológicos
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${isActive
                ? "bg-optionMenu text-white border-l-4 border-textMenu"
                : "hover:bg-fondoPrincipal hover:text-textMenu"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;