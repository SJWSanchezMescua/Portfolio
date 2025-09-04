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
      // alert("✅ Login correcto, ahora puedes entrar al panel admin");
      router.push("/admin"); // opcional redirección
    } catch (err) {
      setError("❌ Error en login: " + err.message);
    }
  };

  return (
    // Fondo con el degradado de azul oscuro a negro
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#001f3f] to-[#1a1a1a] px-4">
      <form
        onSubmit={handleLogin}
        // Fondo semi-transparente que deja ver el fondo interactivo
        className="bg-black/50 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[#7FDBFF] mb-6 text-center">
          Ingreso VIP
        </h1>

        <input
          type="email"
          placeholder="Ingrese su correo"
          // Colores de borde y foco acordes a la paleta
          className="w-full p-3 text-white border border-gray-600 bg-gray-800 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#7FDBFF]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Clave"
          // Colores de borde y foco acordes a la paleta
          className="w-full p-3 text-white border border-gray-600 bg-gray-800 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#7FDBFF]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error !== "" && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          // Botón con colores de la nueva paleta
          className="w-full bg-[#7FDBFF] text-black py-3 rounded hover:bg-[#B3E5FC] transition font-bold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
