import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const GlobalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-fondoPrincipal">
      {sidebarOpen && <Sidebar />}

      <div className="flex-1 flex flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 bg-fondoPrincipal text-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GlobalLayout;