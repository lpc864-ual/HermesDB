import { useState, useRef } from 'react';
import type { ChangeEvent } from "react";
import uploadSign from '../assets/images/upload-sign.svg';
import AvatarLogout from '../components/AvatarLogout';
import LogoGlow from '../components/LogoGlow';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Chat() {
  {/*File upload module*/}
  const [buttomIsSelected, setButtomIsSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setButtomIsSelected(true);
    }
  };

  {/*Logo glow-effect*/}
    
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
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl flex flex-col gap-4">
            <h2 className="-mb-2 px-2 text-xl font-bold">Connect to a Remote Database</h2>
            <Input
              type="text"
              placeholder="Enter your database URL"
              className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="flex min-h-screen w-screen">
        
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-white flex flex-col justify-between py-6 px-4">
          {/* Usuario e historial de chats (placeholder) */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <AvatarLogout />
              </div>
              <div className="flex-1 w-full overflow-y-auto flex flex-col-reverse gap-2">
              {/* Historial de chats (placeholder) */}
              <Button variant="outline">Chat 1</Button>
              <Button variant="outline">Chat 2</Button>
              <Button variant="outline">Chat 3</Button>
            </div>
          </div>
          {/* Botón nuevo chat */}
          <Button variant="secondary">
            New chat
          </Button>
        </aside>
        {/* Main chat area */}
        <main className="flex-1 flex flex-col items-center justify-center relative">
          {buttomIsSelected ? (
            <>
              {/* Logo centrado */}
              <LogoGlow isTyping={isTyping}/>
              {/* Barra de búsqueda abajo */}
              <form className="absolute bottom-0 left-0 w-full flex items-center bg-white border-t border-gray-300 px-6 py-4 z-20 gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
                <Button type="submit" variant="default" disabled={!inputValue.trim()}>
                  Enviar
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center w-full h-full">
              <section className="min-h-screen flex flex-col items-center justify-center">
                <div className="flex flex-row gap-8 items-center">
                  {/* Botón Upload Schema */}
                  <button onClick={handleUploadClick} className="w-48 h-48 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md">
                    <img
                      src={uploadSign}
                      alt="Upload icon"
                      className="w-8 h-8 text-gray-800"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-semibold text-gray-800">Upload Schema</span>
                      <span className="text-xs text-gray-600 text-center">Upload a .sql file describing your database</span>
                    </div>
                    <Input
                      type="file"
                      accept=".sql"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    /> 
                  </button>

                  {/* Botón Insert DB Credentials */}
                  <button onClick={() => setShowModal(true)} className="w-48 h-48 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="text-4xl font-bold text-black">
                      URL
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-gray-800">Connect to a Remote Database</span>
                      <span className="text-xs text-gray-600 text-center"> Use your connection URL </span>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );

}