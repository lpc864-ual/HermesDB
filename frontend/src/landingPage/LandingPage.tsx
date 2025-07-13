import { useNavigate } from 'react-router-dom';

function AnimatedBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Círculo rojo */}
            <div className="absolute w-96 h-96 bg-red-400 opacity-60 rounded-full filter blur-3xl animate-move1" style={{ top: '10%', left: '10%' }} />
            {/* Círculo amarillo */}
            <div className="absolute w-80 h-80 bg-yellow-300 opacity-50 rounded-full filter blur-2xl animate-move2" style={{ top: '40%', left: '60%' }} />
            {/* Círculo naranja */}
            <div className="absolute w-72 h-72 bg-orange-400 opacity-40 rounded-full filter blur-2xl animate-move3" style={{ top: '60%', left: '30%' }} />
            {/* Puedes agregar más círculos si quieres */}
        </div>
    );
}

function Intro() {
    return (
        <section className="relative min-h-screen flex flex-col">
            <AnimatedBackground />
            <main className="flex flex-1 flex-col items-center justify-center text-center">
                <h1 className="text-5xl md:text-6xl font-serif mb-4">HermesDB</h1>
                <h2 className="text-4xl md:text-5xl font-serif font-light">Connecting you to your data</h2>
            </main>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path d="M12 -110v128M19 12l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}

function Instructions() {
    return (
        <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center transition-colors duration-700">
            <h2 className="text-5xl font-bold mb-4 text-black text-center">
                Your data, in your language
            </h2>
            <div className="max-w-5xl w-full flex flex-row gap-8 justify-center">
                {/* Cuando este hecha la interfaz completamente, poner capturas correctas antes de cada paso */}
                {/* Paso 1 */}
                <div className="flex-1 flex flex-col items-start gap-4 bg-gray-50 rounded-xl p-6 shadow">
                    <div className="flex items-center">
                        <img
                            src="/connect-your-database.png"
                            alt="Connect your database"
                            className="w-100 h-100 object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <span className="font-semibold text-lg">Connect your database</span>
                    </div>

                    <div className="text-gray-700 mt-1 text-justify">
                        If you only have the schema, Hermes can help you explore it.<br /><br />
                        If you connect to the full database, you'll be able to ask about your data too.
                    </div>
                </div>
                {/* Paso 2 */}
                <div className="flex-1 flex flex-col items-start gap-4 bg-gray-50 rounded-xl p-6 shadow">
                    <div className="flex items-center">
                        <img
                            src="/ask-your-question.png"
                            alt="ask-your-question"
                            className="w-100 h-100 object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <span className="font-semibold text-lg">Ask your question</span>
                    </div>
                    <div className="text-gray-700 mt-1">
                        Write what you want to know — as naturally as you'd say it.<br /><br />
                        Hermes takes care of the rest.
                    </div>
                </div>
                {/* Paso 3 */}
                <div className="flex-1 flex flex-col items-start gap-4 bg-gray-50 rounded-xl p-6 shadow">
                    <div className="flex items-center">
                        <img
                            src="/get-your-answer.png"
                            alt="get-your-answer"
                            className="w-100 h-100 object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <span className="font-semibold text-lg">Get your answer</span>
                    </div>
                    <div className="text-gray-700 mt-1">
                        In seconds, you'll get a clear, human-friendly response.<br />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Start() {
    const navigate = useNavigate();

    return (
        <section className="w-full min-h-[40vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                Ready to talk to your data?
            </h2>
            <div className="flex flex-col items-center gap-4">
                <button onClick={() => navigate('/chat')} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold shadow transition">
                    Try it now
                </button>
            </div>
        </section>
    );
}

export default function LandingPage() {
    return (
        <div>
            <Intro />
            <Instructions />
            <Start />
        </div>
    )
}
