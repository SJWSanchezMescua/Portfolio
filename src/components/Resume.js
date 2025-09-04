import React from 'react';

const TimelineItem = ({ title, institution }) => (
<div className="relative pl-8 pb-8 last:pb-0">
    <div className="absolute top-0 left-0 h-full w-0.5 bg-[#7FDBFF]"></div>
    <div className="absolute top-2 left-0 w-4 h-4 rounded-full bg-[#7FDBFF] -ml-1.5"></div>
    <h3 className="font-semibold text-lg text-[#7FDBFF]">{title}</h3>
    <p className="text-gray-300">{institution}</p>
</div>
);

export default function Resume() {
return (
    <section className="my-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-[#7FDBFF]">Resume</h2>
    <div className="grid md:grid-cols-2 gap-12">
        <div>
        <h3 className="text-2xl font-bold mb-4 text-[#7FDBFF]">Education</h3>
        <TimelineItem title="Web Development" institution="UTEL" />
        <TimelineItem title="Certified Scrum Master" institution="Scrum Alliance" />
        <TimelineItem title="UX/UI Design" institution="Google" />
        </div>
        <div>
        <h3 className="text-2xl font-bold mb-4 text-[#7FDBFF]">Experience</h3>
        <TimelineItem title="Frontend Developer" institution="Company XYZ" />
        <TimelineItem title="Web Analyst" institution="Company ABC" />
        </div>
    </div>
    </section>
);
}