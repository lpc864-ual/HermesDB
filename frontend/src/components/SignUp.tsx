import { useState, type FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleIsLoading, setGoogleIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const setScreen = useAuthStore((state) => state.setScreen);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Esta línea es crucial
        setIsLoading(true);
        setError("");

        // Validar email
        if (!email) {
            setError("Introduzca un correo electrónico");
            console.log(error);
            setIsLoading(false);
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            setError("El correo debe terminar en @gmail.com");
            setIsLoading(false);
            return;
        }

        // Validar contraseña segura
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.");
            setIsLoading(false);
            return;
        }

        // Confirmación de contraseña
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }

        try {
            // Enviar datos al backend
            const response = await fetch("http://localhost:3001/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al registrar usuario");
            }

            // Registro exitoso
            console.log("Usuario registrado:", data);

            // Redirigir al dashboard
            navigate("/dashboard", {
                state: {
                    message: "Registro exitoso. Ahora puedes navegar en el dashboard.",
                },
            });
        } catch (err) {
            console.error("Error en el registro:", err);
            setError(
                err instanceof Error ? err.message : "Error al conectar con el servidor"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md p-8 ml-16">
            <h2 className="text-2xl font-bold text-center mb-6">Get Started</h2>

            <form onSubmit={() => { }} className="space-y-3">
                <div className="space-y-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-850"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-0">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-850"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center text-gray-600 px-3"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="space-y-0">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-850"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center text-gray-600 px-3"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-600 text-sm pb-2">{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white flex items-center justify-center py-2 px-4 ${isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <BiLoaderAlt className="animate-spin mr-2 h-5 w-5" />
                            Processing...
                        </>
                    ) : (
                        "Sign up"
                    )}
                </button>
            </form>

            <button
                onClick={() => { }}
                disabled={googleIsLoading}
                className={`w-full border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 flex items-center justify-center py-2 px-4 mt-4 ${googleIsLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-gray-300"
                    }`}
            >
                {googleIsLoading ? (
                    <>
                        <BiLoaderAlt className="animate-spin mr-2 h-5 w-5" />
                        Processing...
                    </>
                ) : (
                    <>
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Sign up with Google
                    </>
                )}
            </button>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Already have an account?</span>{" "}
                <button
                    type="button"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setScreen("sign-in")}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUp;
