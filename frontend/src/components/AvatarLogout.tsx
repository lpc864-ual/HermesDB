import { User, LogOut } from "lucide-react";

export default function AvatarHoverLogout() {
  return (
    <div className="relative w-16 h-16 rounded-full bg-secondary flex items-center justify-center cursor-pointer group transition-colors duration-300 hover:bg-red-500">
      {/* Ícono de usuario (visible por defecto, se oculta en hover) */}
      <User
        className="absolute size-6 text-primary opacity-100 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Ícono de logout (invisible por defecto, aparece en hover) */}
      <LogOut
        className="absolute size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}
