import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FaGear } from "react-icons/fa6";

export default function Configuracion() {

    // Estados
    const [theme, setTheme] = useState("light");
    const [color, setColor] = useState("turquoise");
    const [fontSize, setFontSize] = useState("medium");
    const [language, setLanguage] = useState("es");

    // Leer cookies
    useEffect(() => {
        setTheme(Cookies.get("theme") || "light");
        setColor(Cookies.get("color") || "turquoise");
        setFontSize(Cookies.get("fontSize") || "medium");
        setLanguage(Cookies.get("language") || "es");
    }, []);

    // Aplicar estilos
    /*useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-color", color);
        document.documentElement.setAttribute("data-font", fontSize);
    }, [theme, color, fontSize]);*/
    useEffect(() => {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

}, [theme]);

    // Guardar
    const saveSettings = () => {
        Cookies.set("theme", theme, { expires: 30 });
        Cookies.set("color", color, { expires: 30 });
        Cookies.set("fontSize", fontSize, { expires: 30 });
        Cookies.set("language", language, { expires: 30 });

        alert("Configuración guardada.");
    };

return (
    <div className="p-6">
        <FaGear />
        <h1 className="text-3xl font-bold mb-6 text-textMenu">
            Configuración de SICET.
        </h1>

        {/* Tema */}
        <div className="mb-6">
            <label className="block mb-2 font-semibold">
                Tema
            </label>

            <label htmlFor="theme">Tema</label>
            <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-3 rounded-lg bg-sidebar border border-gray-600"
            >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
            </select>
        </div>

        {/* Botón Guardar */}
        <button
            onClick={saveSettings}
            className="
                bg-textMenu
                text-black
                px-6
                py-3
                rounded-lg
                font-semibold
                hover:opacity-90
                transition
            "
        >
            Guardar preferencias
        </button>
    </div>
);
}
