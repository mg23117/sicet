import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GlobalLayout from "./layouts/GlobalLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GeoPanel from "./pages/GeoPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GlobalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <GlobalLayout />
            </ProtectedRoute>}
        >
          <Route path="/geolocalizacion" element={<GeoPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;