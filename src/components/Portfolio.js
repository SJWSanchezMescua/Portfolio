import React from 'react';

const ProjectCard = ({ project }) => (
<div className="bg-black/50 rounded-2xl shadow-lg p-4 border border-gray-700 hover:border-[#7FDBFF] transition duration-300">
    {project.imageUrl && (
    <img src={project.imageUrl} alt={project.title} className="rounded-xl mb-4 w-full h-48 object-cover" />
    )}
    <p className="text-sm text-gray-400 mb-1">{project.type || "Visual Development"}</p>
    <h3 className="text-xl font-semibold mb-2 text-[#7FDBFF]">{project.title}</h3>
    <p className="text-sm text-gray-300 mb-3">{project.description}</p>
    {project.projectUrl && (
    <a href={project.projectUrl} target="_blank" className="inline-block text-[#7FDBFF] hover:text-[#B3E5FC] font-bold">
        View Project →
    </a>
    )}
</div>
);

export default function Portfolio({ projects }) {
return (
    <section className="my-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-[#7FDBFF]">My Projects</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
        projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))
        ) : (
        <p className="col-span-3 text-center text-gray-300">No hay proyectos aún...</p>
        )}
    </div>
    </section>
);
}