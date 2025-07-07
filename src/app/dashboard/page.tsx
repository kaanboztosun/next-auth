"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg">Yükleniyor...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-red-600">Erişim reddedildi. Lütfen giriş yapın.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <p><strong>Kullanıcı:</strong> {session.user?.name}</p>
        <p><strong>Email:</strong> {session.user?.email}</p>
      </div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => signOut()}
      >
        Çıkış Yap
      </button>
    </div>
  );
}