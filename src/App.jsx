import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-2xl font-semibold">Size Me</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-lg">Your clothing size matching app will go here.</p>
      </main>
    </div>
  );
}
