import { useState, useRef } from 'react';
import uploadSign from '../assets/images/upload-sign.svg';

export default function Chat() {
  const [buttomIsSelected, setButtomIsSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl flex flex-col gap-4">
            <h2 className="-mb-2 px-2 text-xl font-bold">Connect to a Remote Database</h2>
            <input
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
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex min-h-screen w-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
          {/* Usuario e historial de chats (placeholder) */}
          <div className="flex flex-col items-center gap-6">
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
          {buttomIsSelected ? (
            <>
              {/* Logo centrado */}
              <img src="/logo.svg" alt="Logo" className="absolute inset-0 m-auto opacity-10 w-1/2 h-1/2 pointer-events-none" />
              {/* Barra de búsqueda abajo */}
              <form className="absolute bottom-0 left-0 w-full flex items-center bg-white border-t border-gray-300 px-6 py-4 z-20">
                <input
                  type="text"
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400">
                </input>
                <button type="submit" className="ml-4 px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">Enviar</button>
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
                    <input
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