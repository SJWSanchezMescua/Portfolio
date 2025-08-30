"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Escucha los cambios en la colección 'projects' de Firestore en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectList);
      },
      (error) => {
        console.error("❌ Error al escuchar projects:", error);
      }
    ); // Importante: Cancela la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-t from-[#1a1a1a] to-[#c09c0e] text-white p-6">
      {/* 🔹 SECCIÓN 1: BIENVENIDA Y ACERCA DE MÍ */}
      <section className="text-center my-12 p-6 bg-black/50 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-2 text-yellow-500">
          Hola, soy Salim Sánchez
        </h1>
        <p className="text-xl text-gray-200 mb-4">
          Desarrollador web especializado en frontend
        </p>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Soy un profesional apasionado por crear aplicaciones web modernas, intuitivas y funcionales,
          especializado en Next.js, Tailwind CSS y MySQL. Mi objetivo es desarrollar soluciones eficientes
          y atractivas que resuelvan desafíos complejos. ¡Bienvenido a mi portafolio!
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://www.linkedin.com/in/s2salimjuanwilliams4s/"
            target="_blank"
            className="text-yellow-600 hover:text-yellow-500"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SJWSanchezMescua"
            target="_blank"
            className="text-yellow-600 hover:text-yellow-500"
          >
            GitHub
          </a>
        </div>
      </section>
      {/* 🔹 SECCIÓN 2: TÍTULO DE PROYECTOS Y GRID */}
      <h2 className="text-3xl font-bold text-center mb-10 text-yellow-500">
        🚀 Mis Proyectos
      </h2>
      {/* grid de proyectos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-black/60 rounded-2xl shadow-lg p-4 hover:scale-105 transition duration-300"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-3">
                {project.description}
              </p>
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white"
                >
                Ver Proyecto        
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-300">
            No hay proyectos aún. Ingresa al panel de administración
            para agregar el primero.
          </p>
        )}
      </div>
       {/* 🔹 SECCIÓN 3: CONTACTO */}
      <section className="text-center my-12 p-6 bg-black/50 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Contacto</h2>
        <p className="text-gray-300 mb-4">
          ¿Tienes una idea o quieres colaborar? ¡Hablemos!
        </p>
        <a
          href="mailto:salimsanchezmescua@gmail.com"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-bold text-white transition"
        >
          Enviar un Email 
        </a>
      </section>
    </main>
  );
}
