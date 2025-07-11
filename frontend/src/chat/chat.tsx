import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import LogoGlow from '../components/LogoGlow'; 
import AvatarWithLogout from "../components/AvatarLogout";

export default function Chat() {

  {/*Efecto glow del logo al escribir*/}
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeout = useRef<number | undefined>(undefined);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    setIsTyping(true);

    window.clearTimeout(typingTimeout.current);
    typingTimeout.current = window.setTimeout(() => {
      setIsTyping(false);
    }, 800); 
  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
        {/* Usuario e historial de chats (placeholder) */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
            <AvatarWithLogout />
          </div>
          <div className="flex-1 w-full overflow-y-auto flex flex-col-reverse gap-2">
            {/* Historial de chats (placeholder) */}
            <div className="bg-gray-800 rounded p-2 mb-2">Chat 1</div>
            <div className="bg-gray-800 rounded p-2 mb-2">Chat 2</div>
            <div className="bg-gray-800 rounded p-2 mb-2">Chat 3</div>
          </div>
        </div>
        {/* Botón nuevo chat */}
        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded mt-4">Nuevo chat</button>
      </aside>
      {/* Main chat area */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Logo centrado */}
        <LogoGlow 
        isTyping={isTyping}
        />
        {/* Barra de búsqueda abajo */}
        <form className="absolute bottom-0 left-0 w-full flex items-center bg-white border-t border-gray-300 px-6 py-4 z-20">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button type="submit" className="ml-4 px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">Enviar</button>
        </form>
      </main>
    </div>
  );
}