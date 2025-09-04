// app/page.js
"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import dynamic from 'next/dynamic';

// Componentes de las nuevas secciones
import WhatIDo from '@/components/WhatIDo';
import ProfessionalSkills from '@/components/ProfessionalSkills';
import Portfolio from '@/components/Portfolio';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';

// Efectos de fondo
const InteractiveBackground = dynamic(() => import('@/components/InteractiveBackground'), { ssr: false });
const MouseLight = dynamic(() => import('@/components/MouseLight'), { ssr: false });

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
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
    );
    return () => unsubscribe();
  }, []);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-t from-[#020618] to-[#00598a] text-white p-6">
      {/* Fondo interactivo y destello */}
      <InteractiveBackground />
      <MouseLight />
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Sección de Bienvenida/Hero */}
        <section className="text-center my-12 p-6 bg-black/50 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-2 text-[#7FDBFF]">Hello, my name is Salim Sánchez</h1>
          <p className="text-xl text-gray-200 mb-4">Web developer specialized in frontend</p>
          <p className="text-gray-300 max-w-2xl mx-auto">I'm passionate about building modern, intuitive, and functional web applications...</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/s2salimjuanwilliams4s/" target="_blank" className="text-[#7FDBFF] hover:text-[#B3E5FC]">LinkedIn</a>
            <a href="https://github.com/SJWSanchezMescua" target="_blank" className="text-[#7FDBFF] hover:text-[#B3E5FC]">GitHub</a>
          </div>
        </section>
        
        {/* Sección "What I Do" */}
        <WhatIDo />
        
        {/* Sección de Habilidades */}
        <ProfessionalSkills />
        
        {/* Sección de Proyectos */}
        <Portfolio projects={projects} />
        
        {/* Sección de Resumen */}
        <Resume />

        {/* Sección de Contacto */}
        <Contact />
        
      </div>
    </div>
  );
}
