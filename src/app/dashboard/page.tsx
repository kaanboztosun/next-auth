"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

const sidebarLinks = [
  { name: "Ana Sayfa", href: "/dashboard", icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" />
    </svg>
  ) },
  { name: "Profil", href: "#", icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
    </svg>
  ) },
  { name: "Ayarlar", href: "#", icon: (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-lg">Yükleniyor...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-lg text-red-600">Erişim reddedildi. Lütfen giriş yapın.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col relative">
      
      <header className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-purple-600 shadow-lg px-6 py-4 z-20">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-blue-800 transition"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menüyü Aç"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl font-bold text-white tracking-wide drop-shadow">NextAuth Dashboard</span>
        </div>
        <button
          className="px-5 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-100 transition font-semibold shadow"
          onClick={() => signOut()}
        >
          Çıkış Yap
        </button>
      </header>

      
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-700 to-purple-600">
          <span className="text-lg font-bold text-white tracking-wide">Menü</span>
          <button
            className="p-2 rounded hover:bg-blue-800 transition"
            onClick={() => setSidebarOpen(false)}
            aria-label="Menüyü Kapat"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-6 py-6">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center text-gray-700 hover:bg-blue-100 rounded px-3 py-2 font-medium transition"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

   
      <main className="flex-1 flex flex-col items-center justify-center p-6 transition-all duration-300">
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center w-full max-w-lg border border-blue-100">
          <div className="w-28 h-28 mb-4">
            <img
              src={session.user?.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(session.user?.name || "Kullanıcı")}
              alt="Avatar"
              className="rounded-full w-28 h-28 object-cover border-4 border-blue-400 shadow"
            />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-blue-700 drop-shadow">Hoşgeldin, {session.user?.name || "Kullanıcı"}!</h1>
          <p className="text-gray-600 mb-6 text-lg">{session.user?.email}</p>
          <button
            className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold shadow"
            onClick={() => signOut()}
          >
            Çıkış Yap
          </button>
        </div>
      </main>
    </div>
  );
}