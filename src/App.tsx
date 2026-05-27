import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import GeoPanel from "./pages/GeoPanel";

import GlobalLayout from "./layouts/GlobalLayout";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GlobalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/inventario" element={<Inventory />} />
          <Route path="/geolocalizacion" element={<GeoPanel />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;