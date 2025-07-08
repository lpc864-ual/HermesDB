import { useAuthStore } from "../store/authStore";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import ForgotPassword from "../components/forgot-password";


const Auth = () => {
    const screen = useAuthStore((state) => state.screen);

    return (
        <div className="flex min-h-screen w-screen">
            {/* Lado izquierdo */}
            <div className="w-1/2 bg-white flex items-center justify-center">
                {screen == "sign-in" ? (
                    <SignIn></SignIn>
                ) : screen == "sign-up" ? (
                    <SignUp></SignUp>
                ) : (
                    <ForgotPassword></ForgotPassword>
                )}
            </div>
            {/* Lado derecho */}
            <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-400"/>
        </div>
    );
};

export default Auth;