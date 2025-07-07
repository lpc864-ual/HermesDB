import React from "react";

// Asegúrate de que la ruta del logo sea correcta según tu estructura de archivos
import logo from "../../public/logo.svg";

const SignIn: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <img src={logo} alt="Logo" className="w-40 h-40" />
    </div>
  );
};

export default SignIn;