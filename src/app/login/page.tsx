"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <span className="text-lg">Yükleniyor...</span>
      </div>
    );
  }

  if (session) {
   
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <span className="text-lg">Yönlendiriliyorsunuz...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md animate-fade-in">
        <div className="w-24 h-24 mb-6">
          <img
            src="/vercel.svg"
            alt="Logo"
            className="w-24 h-24 object-contain rounded-full border-4 border-blue-400 shadow"
          />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 drop-shadow text-center w-full">Hoşgeldiniz</h1>
        <p className="text-gray-600 mb-6 text-center">Devam etmek için Auth0 ile giriş yap.</p>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold shadow-lg text-lg"
          onClick={() => signIn("auth0")}
        >
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#eb5424"/>
            <path d="M16 7l2.472 7.604h7.993l-6.47 4.7 2.472 7.604L16 19.208l-6.47 4.7 2.472-7.604-6.47-4.7h7.993L16 7z" fill="#fff"/>
          </svg>
          Auth0 ile Giriş Yap
        </button>
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