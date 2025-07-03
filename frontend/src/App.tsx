import { useState } from 'react'

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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-serif mb-4">HermesDB</h1>
        <h2 className="text-4xl md:text-5xl font-serif font-light">Connecting you to your data</h2>
      </main>
    </div>
  )
}
