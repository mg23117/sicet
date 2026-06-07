import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import sidebarES from "./locales/es/sidebar.json";
import sidebarEN from "./locales/en/sidebar.json";

import headerES from "./locales/es/header.json";
import headerEN from "./locales/en/header.json";

import dashboardES from "./locales/es/dashboard.json";
import dashboardEN from "./locales/en/dashboard.json";

import inventoryES from "./locales/es/inventory.json";
import inventoryEN from "./locales/en/inventory.json";

import geopanelES from "./locales/es/geopanel.json";
import geopanelEN from "./locales/en/geopanel.json";

import settingsES from "./locales/es/configuracion.json";
import settingsEN from "./locales/en/configuracion.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "es",
    fallbackLng: "es",

    resources: {
      es: {
        sidebar: sidebarES,
        header: headerES,
        dashboard: dashboardES,
        inventory: inventoryES,
        geopanel: geopanelES,
        settings: settingsES
      },
      en: {
        sidebar: sidebarEN,
        header: headerEN,
        dashboard: dashboardEN,
        inventory: inventoryEN,
        geopanel: geopanelEN,
        settings: settingsEN
      }
    }
  });

export default i18n;