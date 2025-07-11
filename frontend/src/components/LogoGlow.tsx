import logoGray from "../../public/logoGray.svg";

type LogoGlowProps = {
  isTyping: boolean;
};

export default function LogoGlow({ isTyping }: LogoGlowProps) {
  return (
    <img
      src={logoGray}
      alt="logo"
      className={`w-1/4 max-w-xs h-auto 
        transition-all duration-700 ease-in-out 
        ${isTyping 
          ? "drop-shadow-none scale-105 animate-pulse" //[0_0_4px_rgba(187,159,253,0.9)] 
          : "drop-shadow-none scale-100 opacity-90"
        }`}
    />
  );
}
