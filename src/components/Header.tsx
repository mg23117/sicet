import { Menu, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-16 bg-header border-b border-slate-700 flex items-center justify-between px-6 text-textMenu">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Mostrar u ocultar menú lateral"
          title="Menú"
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-semibold">
          SICET
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">
                {user.displayName}
              </p>
              <p className="text-xs text-textMuted">
                {user.email}
              </p>
            </div>

            <img
              src={user.photoURL || ""}
              alt="Perfil del usuario"
              className="w-10 h-10 rounded-full border border-primary"
            />

            <button
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              className="p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;