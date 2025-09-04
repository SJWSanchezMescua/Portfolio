import React from 'react';

const SkillIcon = ({ name, icon }) => (
<div className="bg-black/50 rounded-lg shadow-md p-4 text-center border border-gray-700 hover:border-[#7FDBFF] transition-colors">
    <img src={icon} alt={name} className="w-16 h-16 mx-auto mb-2" />
    <p className="text-sm text-gray-300">{name}</p>
</div>
);

export default function ProfessionalSkills() {
const skills = [
    { name: "HTML5", icon: "/icons/html.png" },
    { name: "CSS3", icon: "/icons/css.png" },
    { name: "JavaScript", icon: "/icons/js.png" },
    { name: "React.js", icon: "/icons/react.png" },
    { name: "Next.js", icon: "/icons/nextjs.png" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.png" },
    { name: "Firebase", icon: "/icons/firebase.png" },
    { name: "Git", icon: "/icons/git.png" },
];

return (
    <section className="my-12">
    <h2 className="text-3xl font-bold text-center mb-2 text-[#7FDBFF]">Professional Skills</h2>
    <p className="text-center text-gray-300 mb-10">I design and build digital products using modern tools and technologies.</p>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
        <SkillIcon key={index} name={skill.name} icon={skill.icon} />
        ))}
    </div>
    </section>  );
}