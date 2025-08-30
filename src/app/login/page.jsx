"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //alert("✅ Login correcto, ahora puedes entrar al panel admin");
      router.push("/admin"); // opcional redirección
    } catch (err) {
      setError("❌ Error en login: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#c09c0e] to-[#1a1a1a] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-6 text-center">
          Ingreso VIP
        </h1>

        <input
          type="email"
          placeholder="Ingrese su correo"
          className="w-full p-3 text-gray-700 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Clave"
          className="w-full p-3 text-gray-700 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error !== "" && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-[#c09c0e] py-3 rounded hover:bg-gray-900 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
