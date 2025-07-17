import logo from "../../public/logo.svg";

type LogoGlowProps = {
  isTyping: boolean;
};

export default function LogoGlow({ isTyping }: LogoGlowProps) {
  return (
    <img
      src={logo}
      alt="logo"
      className={`w-1/4 max-w-xs h-auto 
        transition-all duration-1500 ease-in-out opacity-5
        ${isTyping 
          ? "drop-shadow-none scale-105 animate-pulse"
          : "drop-shadow-none scale-100"
        }`}
    />
  );
}
