"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status !== "loading" && (!session || (session as any).role !== "admin")) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || (session as any).role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <span className="text-lg">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-4 text-purple-700 drop-shadow text-center w-full">Admin Panel</h1>
        <p className="text-gray-600 mb-6 text-center">Yalnızca admin rolüne sahip kullanıcılar bu sayfayı görebilir.</p>
        <span className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
          Rol: {(session as any).role}
        </span>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}