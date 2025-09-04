"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase"; // 'storage' ya no es necesario
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
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProjects();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        imageUrl, // Usamos la URL directamente
        projectUrl,
      });

      // Limpiar los campos después de la subida
      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");
      setLoading(false);
      router.refresh();
    } catch (err) {
      console.error("Error al agregar el proyecto:", err);
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
        await deleteDoc(doc(db, "projects", id));

        // Actualiza el estado para eliminar el proyecto
        setProjects(projects.filter(project => project.id !== id));
        
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
    }
};

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#001f3f] to-[#1a1a1a] text-white p-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Panel de Controles (Columna Izquierda) */}
        <aside className="w-full md:w-1/3 p-6 bg-black/50 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-[#7FDBFF]">Panel de Control</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-bold"
            >
              Cerrar Sesión
            </button>
          </div>

          <h2 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
            Agregar Nuevo Proyecto
          </h2>
          <form onSubmit={addProject} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Título del proyecto"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#7FDBFF]"
            />
            <textarea
              placeholder="Descripción breve"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#7FDBFF]"
            />
            
            {/* Solo queda el campo de la URL */}
            <input
              type="text"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#7FDBFF]"
            />

            <input
              type="text"
              placeholder="URL del proyecto"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#7FDBFF]"
            />
            <button
              type="submit"
              className="w-full bg-[#7FDBFF] hover:bg-[#B3E5FC] text-black px-4 py-2 rounded font-bold transition"
              disabled={loading}
            >
              {loading ? "Subiendo..." : "Agregar Proyecto"}
            </button>
          </form>
        </aside>

        {/* Sección de Lista de Proyectos (Columna Derecha) */}
        <main className="w-full md:w-2/3 p-6 bg-black/50 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-[#7FDBFF] mb-4">
            Proyectos Publicados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-black/40 rounded-lg shadow-md border border-gray-700 p-4 flex flex-col justify-between hover:border-[#7FDBFF] transition-colors"
              >
                <div>
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-bold text-[#7FDBFF] mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-white underline"
                  >
                    Ver proyecto
                  </a>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-bold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
