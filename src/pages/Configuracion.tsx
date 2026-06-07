import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function Configuracion() {

    const { t } = useTranslation("settings");

    // Estados
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("es");

    // Leer cookies al cargar
    useEffect(() => {

        const savedTheme =
            Cookies.get("theme") || "light";

        const savedLanguage =
            Cookies.get("language") || "es";

        setTheme(savedTheme);
        setLanguage(savedLanguage);

        i18n.changeLanguage(savedLanguage);

    }, []);

    // Aplicar tema
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

    // Aplicar idioma
    useEffect(() => {

        i18n.changeLanguage(language);

    }, [language]);

    // Guardar preferencias
    const saveSettings = () => {

        Cookies.set("theme", theme, {
            expires: 30,
        });

        Cookies.set("language", language, {
            expires: 30,
        });

        alert(t("saved"));

    };

    return (
        <div className="p-8 max-w-6xl mx-auto">

            {/* Encabezado */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-bodyTxtMain">
                    {t("title")}
                </h1>

                <p className="text-bodyTxtThird mt-2">
                    {t("description")}
                </p>

            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* Apariencia */}
                <div className="bg-bodyBgSeg rounded-2xl p-6 border border-gray-700 shadow-lg">

                    <h2 className="text-xl font-semibold text-bodyTxtSeg mb-6">
                        {t("appearance")}
                    </h2>

                    <div>

                        <label
                            htmlFor="theme"
                            className="block text-bodyTxtMain font-medium mb-2"
                        >
                            {t("theme")}
                        </label>

                        <select
                            id="theme"
                            value={theme}
                            onChange={(e) =>
                                setTheme(e.target.value)
                            }
                            className="
                                w-full
                                bg-bodyBgThird
                                text-bodyTxtMain
                                border border-gray-600
                                rounded-xl
                                px-4 py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-400
                                transition
                            "
                        >
                            <option value="light">
                                {t("light")}
                            </option>

                            <option value="dark">
                                {t("dark")}
                            </option>

                        </select>

                    </div>

                </div>

                {/* Idioma */}
                <div className="bg-bodyBgSeg rounded-2xl p-6 border border-gray-700 shadow-lg">

                    <h2 className="text-xl font-semibold text-bodyTxtSeg mb-6">
                        {t("language")}
                    </h2>

                    <div>

                        <label
                            htmlFor="language"
                            className="block text-bodyTxtMain font-medium mb-2"
                        >
                            {t("language label")}
                        </label>

                        <select
                            id="language"
                            value={language}
                            onChange={(e) =>
                                setLanguage(e.target.value)
                            }
                            className="
                                w-full
                                bg-bodyBgThird
                                text-bodyTxtMain
                                border border-gray-600
                                rounded-xl
                                px-4 py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-cyan-400
                                transition
                            "
                        >
                            <option value="es">
                                Español
                            </option>

                            <option value="en">
                                English
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {/* Botón Guardar */}
            <div className="flex justify-end">

                <button
                    onClick={saveSettings}
                    className="
                        px-6 py-3
                        bg-cyan-500
                        text-black
                        font-semibold
                        rounded-xl
                        hover:shadow-lg
                        hover:shadow-cyan-500/30
                        hover:scale-105
                        transition-all
                    "
                >
                    {t("save")}
                </button>

            </div>

        </div>
    );
}
