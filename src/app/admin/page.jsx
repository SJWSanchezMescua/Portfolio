"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Nuevos estados para la URL de la imagen y del proyecto
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const router = useRouter(); // cargar proyectos

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProjects();
  }, []); // añadir proyecto

  const addProject = async (e) => {
    e.preventDefault(); // Agregamos los nuevos campos a Firestore
    await addDoc(collection(db, "projects"), {
      title,
      description,
      imageUrl,
      projectUrl,
    });
    setTitle("");
    setDescription("");
    setImageUrl("");
    setProjectUrl("");
    router.refresh(); // refresca datos
  }; // borrar proyecto

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    router.refresh();
  }; // logout

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#c09c0e] to-[#1a1a1a] text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
           {" "}
      <form onSubmit={addProject} className="bg-black/50 p-4 rounded mb-6">
               {" "}
        <input
          type="text"
          placeholder="Título del proyecto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />
               {" "}
        <textarea
          placeholder="Descripción breve"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />
               {" "}
        <input
          type="text"
          placeholder="URL de la imagen (ej: de Imgur, Cloudinary, etc.)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />
               {" "}
        <input
          type="text"
          placeholder="URL del proyecto (ej: a tu sitio web, GitHub, Behance)"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />
               {" "}
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
        >
                    Agregar Proyecto        {" "}
        </button>
             {" "}
      </form>
           {" "}
      <ul>
               {" "}
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col sm:flex-row justify-between bg-black/40 p-3 mb-2 rounded"
          >
                       {" "}
            <div className="mb-2 sm:mb-0">
                            <h2 className="font-bold">{project.title}</h2>     
                      <p>{project.description}</p>
              <p className="text-sm text-gray-400">
                URL Imagen:{" "}
                <a
                  href={project.imageUrl}
                  target="_blank"
                  className="underline"
                >
                  {project.imageUrl}
                </a>
              </p>
              <p className="text-sm text-gray-400">
                URL Proyecto:{" "}
                <a
                  href={project.projectUrl}
                  target="_blank"
                  className="underline"
                >
                  {project.projectUrl}
                </a>
              </p>
                         {" "}
            </div>
                       {" "}
            <button
              onClick={() => deleteProject(project.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded self-end sm:self-center"
            >
                            Eliminar            {" "}
            </button>
                     {" "}
          </li>
        ))}
             {" "}
      </ul>
           {" "}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
                Cerrar Sesión      {" "}
      </button>
         {" "}
    </div>
  );
}
