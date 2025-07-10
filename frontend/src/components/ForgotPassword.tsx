import React, { useState, useRef, type FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ForgotPassword: React.FC = () => {
    // Estados para los pasos: 1: email, 2: código, 3: nueva contraseña
    const [currentStep, setCurrentStep] = useState(1);
    const setScreen = useAuthStore((state) => state.setScreen);

    // Estados para datos
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", "",]);
    const codeInputs = useRef<(HTMLInputElement | null)[]>([]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Estados de UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    //
    const navigate = useNavigate();

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "Password Recovery";
            case 2:
                return "Verify Code";
            case 3:
                return "New Password";
            default:
                return "Password Recovery";
        }
    };

    const renderStep1 = () => (
        <form onSubmit={handleEmailSubmit} className="space-y-2">
            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {error && <p className="text-sm text-red-600 pl-3">{error}</p>}
            </div>

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
                    "Send Confirmation Code"
                )}
            </button>
        </form>
    );

    const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validar email
        if (!email) {
            setIsLoading(false);
            setError("Introduzca un correo electrónico");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            setIsLoading(false);
            setError("El correo debe terminar en @gmail.com");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al verificar correo electrónico");
            }

            // Avanzar al siguiente paso
            setCurrentStep(2);
        } catch (err) {
            console.error("Error al verificar correo electrónico:", err);
            setError(
                err instanceof Error ? err.message : "Error al conectar con el servidor"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep2 = () => (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-center text-gray-700">
                    Enter the Confirmation Code
                </label>
                <p className="text-xs text-center text-gray-500">
                    We've sent a 6-digit code to {email}
                </p>

                <div className="flex justify-center space-x-2">
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { codeInputs.current[index] = el }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    ))}
                </div>

                {error && <p className="text-sm text-center text-red-600">{error}</p>}
            </div>

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
                        Verifying...
                    </>
                ) : (
                    "Confirm Code"
                )}
            </button>

            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                    Resend Code
                </button>
            </div>
        </form>
    );

    //
    const handleCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const code = verificationCode.join("");

        if (code.length !== 6) {
            setError("Introduzca el código completo de 6 dígitos");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Código incorrecto");
            }

            // Avanzar al siguiente paso
            setCurrentStep(3);
        } catch (err) {
            console.error("Error al verificar código:", err);
            setError(
                err instanceof Error ? err.message : "Error al verificar código"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar input del código de verificación
    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return; // Solo un dígito

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Enfocar siguiente input si hay valor
        if (value && index < 5) {
            codeInputs.current[index + 1]?.focus();
        }
    };

    // Manejar teclas en inputs del código
    const handleCodeKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            codeInputs.current[index - 1]?.focus();
        }
    };

    // Reenviar código
    const handleResendCode = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/resend-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al reenviar código");
            }

            // Limpiar código actual
            setVerificationCode(["", "", "", "", "", ""]);

            // Mensaje de éxito (podrías usar un toast aquí)
            setError(""); // Limpiar errores
        } catch (err) {
            console.error("Error al reenviar código:", err);
            setError(err instanceof Error ? err.message : "Error al reenviar código");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep3 = () => (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1 relative">
                <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    New Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={
                        showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <div className="space-y-1 relative">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm New Password
                </label>
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={
                        showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

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
                        Updating...
                    </>
                ) : (
                    "Update Password"
                )}
            </button>
        </form>
    );

    //
    const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validar contraseña segura
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setError(
                "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial."
            );
            setIsLoading(false);
            return;
        }

        // Confirmación de contraseña
        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al actualizar contraseña");
            }

            // Redirigir al dashboard
            navigate("/dashboard", {
                state: {
                    message:
                        "Contraseña actualizada exitosamente. Ahora puedes navegar en el dashboard.",
                },
            });
        } catch (err) {
            console.error("Error al actualizar contraseña:", err);
            setError(
                err instanceof Error ? err.message : "Error al actualizar contraseña"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md p-8 ml-16">
            <h2 className="text-2xl font-bold text-center mb-6">
                {getStepTitle()}
            </h2>

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {currentStep !== 2 && (
                <div className="mt-2 text-center text-sm">
                    <p>
                        Remembered your password?{"  "}
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 font-semibold"
                            onClick={() => setScreen("sign-in")}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;