import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-lg w-full max-w-md">
        
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo del sistema"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg mb-4"
          />

          <h1 className="text-3xl font-bold text-center">
            Iniciar Sesión
          </h1>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-textMenu text-black py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continuar con Google
        </button>
      </div>
    </div>
  );
};

export default Login;