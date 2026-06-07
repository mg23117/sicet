import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { TbLayoutDashboard , TbBriefcase, TbMapPin, TbNut } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("sidebar");
  const menuItems = [
    { icon: <TbLayoutDashboard  />, name: t("dashboard"), path: "/" },
    { icon: <TbBriefcase/>, name: t("inventory"), path: "/inventario" },
    { icon: <TbMapPin/>, name: t("geolocation"), path: "/geolocalizacion" },
    { icon: <TbNut/>, name: t("settings"), path: "/configuracion" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-sbrBgMain border-r border-sbrBgThird text-sbrTxtMain shadow-xl">
      <div className="flex flex-col items-center text-center px-4 py-6 border-b border-sbrBgThird">
        <img
          src={logo}
          alt="Logo del sistema"
          className="w-16 h-16 rounded-full object-cover border-4 border-sbrBgSeg shadow-lg mb-4"
        />

        <h1 className="text-sm font-bold leading-tight">
          {t("systemName")}
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                ? "bg-sbrBgSeg text-sbrTxtSeg border-l-4 border-sbrTxtSeg"
                : "hover:bg-sbrBgSeg hover:text-sbrTxtSeg"
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