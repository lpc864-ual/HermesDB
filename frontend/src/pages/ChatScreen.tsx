import { useState, useRef, useEffect } from 'react';
import uploadSign from '../assets/images/upload-sign.svg';
import { useChatStore } from '../services/store/ChatStore';
import type { Message } from '../types/chat';
import { createConversation } from '../services/api/conversation';
import { mockAddMessageToApi } from '../services/api/conversation';

export default function Chat() {
  const [buttomIsSelected, setButtomIsSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [errorPopup, setErrorPopup] = useState<string | string[] | null>(null);
  const [fadeClass, setFadeClass] = useState('');
  const timeoutRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { chats, currentChatId, addChat, addMessageToStore, setCurrentChat, getCurrentChat } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [aiTypingMessage, setAiTypingMessage] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setButtomIsSelected(true);
      const newId = addChat();
      setCurrentChat(newId);
    }
  };

  const handleConnect = async () => {
    try {
      setIsLoadingUrl(true);
      abortControllerRef.current = new AbortController();
      const result = await createConversation(urlValue, { signal: abortControllerRef.current.signal });
      if (result && (result.error || result.message)) {
        // Si el backend devuelve un array de mensajes, pásalo como array
        if (Array.isArray(result.message)) {
          triggerErrorPopup(result.message);
        } else {
          triggerErrorPopup(result.error || result.message || 'Connection failed. Please try again.');
        }
      } else {
        setErrorPopup(null);
        setShowModal(false);
        const newId = addChat();
        setCurrentChat(newId);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Petición cancelada, no mostrar error
      } else {
        triggerErrorPopup('Connection failed. Please try again.');
      }
    }
    finally {
      setIsLoadingUrl(false);
    }
  };

  const triggerErrorPopup = (msg: string) => {
    setErrorPopup(msg);
    setFadeClass('show');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFadeClass('hide');
      setTimeout(() => setErrorPopup(null), 500);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCancel = () => {
    setShowModal(false);
    setIsLoadingUrl(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; 
      const maxHeight = 40 * 4; 
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentChatId && inputValue.trim()) {
      try {
        // Agregar mensaje del usuario al store
        const msg: Message = { role: 'user', content: inputValue };
        setInputValue('');
        //if (textareaRef.current) textareaRef.current.style.height = '40px';
        addMessageToStore(currentChatId, msg);
        setIsLoadingMessage(true);
        setAiTypingMessage(null);
        setMessageError(null);

        // Enviar al backend 
        const response = await mockAddMessageToApi(currentChatId, msg.content);

        // Agregar respuesta de la IA al store
        if (response && response.content) {
          let i = 0;
          setAiTypingMessage(response.content[i]);
          const interval = setInterval(() => {
            setAiTypingMessage((prev) => (prev ?? '') + response.content[i]);
            i++;
            if (i >= response.content.length) {
              clearInterval(interval);
              addMessageToStore(currentChatId, { role: 'ai', content: response.content });
              setAiTypingMessage(null);
            }
          }, 5);
        }
      } catch (error: any) {
        setMessageError('Error getting response. Please try again.');
      } finally {
        setIsLoadingMessage(false);
      }
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl flex flex-col gap-4">
            <h2 className="-mb-2 px-2 text-xl font-bold">Connect to a Remote Database</h2>
            <input
              type="text"
              placeholder="Enter your connection database URL"
              className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={urlValue}
              onChange={e => setUrlValue(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                disabled={isLoadingUrl}
              >
                {isLoadingUrl ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {errorPopup && (
        <div
          className={`fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 fade-popup ${fadeClass}`}
          style={{ pointerEvents: 'auto' }}
        >
          {Array.isArray(errorPopup) ? (
            <ul className="list-disc pl-5">
              {errorPopup.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          ) : (
            errorPopup
          )}
        </div>
      )}

      <div className="flex min-h-screen w-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 h-screen text-white flex flex-col bg-gradient-to-b from-blue-100 to-purple-100 py-6 px-4">
          {/* Historial de chats scrollable */}
          <div className="flex flex-1 flex-col min-h-0 overflow-y-auto gap-2 custom-scrollbar">
            {chats.slice().reverse().map((chat) => (
              <button
                key={chat.id}
                className={`w-full ${currentChatId === chat.id ? 'bg-indigo-500' : 'bg-indigo-300'} hover:bg-indigo-600 text-white py-1 rounded mb-2`}
                onClick={() => {
                  setCurrentChat(chat.id);
                  setButtomIsSelected(true);
                }}
              >
                Chat {chat.id}
              </button>
            ))}
          </div>
          {/* Botón nuevo chat - fijo al final */}
          <button
            onClick={() => setButtomIsSelected(false)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded mt-4"
          >
            New chat
          </button>
        </aside>

        {/* Main chat area */}
        <main className="relative flex flex-1 flex-col items-center justify-center">
          {buttomIsSelected ? (
            <>
              {/* Mensajes del chat: si el rol es ai y contiene la palabra error --> color rojo e icono de advertencia */}
              <div className="h-[80%] w-full max-w-2xl mx-auto overflow-y-auto mt-6 mb-14 px-4 py-0" style={{ maxHeight: '80vh' }}>
                {getCurrentChat()?.messages.map((m, i) => (
                  <div key={i} className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 break-words ${m.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {/* Mensaje de IA "escribiendo" */}
                {aiTypingMessage && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] rounded-2xl mb-4 px-4 py-2 bg-gray-200 text-gray-900 animate-pulse break-words">
                      {aiTypingMessage}
                    </div>
                  </div>
                )}
              </div>
              {/* Logo centrado */}
              <img src="/logo.svg" alt="Logo" className="absolute index-0 w-1/2 h-1/2 opacity-10 pointer-events-none" draggable={false} />
              {/* Barra de búsqueda abajo */}
              <form onSubmit={handleSendMessage} className="w-full max-w-2xl mx-auto px-2 py-2 bg-white border-gray-300 rounded-2xl flex items-center" style={{ position: 'sticky', bottom: 21, zIndex: 20 }}>
                <textarea
                  ref={textareaRef}
                  placeholder="Write your question..."
                  className="flex-1  px-2 py-2 focus:outline-none resize-none overflow-hidden"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  rows={1}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e as any); // 'as any' para evitar error de tipo, ya que es un KeyboardEvent, pero tu función espera un FormEvent
                    }
                  }}
                />
                <button type="submit" className={`px-4 py-1 rounded text-white transition flex items-center justify-center ${inputValue.trim() ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-300"}`} disabled={!inputValue.trim()}>
                  {isLoadingMessage ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20l16-8-16-8v6l10 2-10 2v6z" />
                    </svg>
                  )}
                </button>
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
                      <span className="text-xs text-gray-600 text-center px-1.5">Upload a .sql file describing your database</span>
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
                      <span className="text-xs text-gray-600 text-center px-1"> Use your connection database URL </span>
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