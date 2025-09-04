import React from 'react';

const Card = ({ title, description }) => (
<div className="bg-black/50 rounded-lg shadow-md p-6 border border-[#7FDBFF]">
    <h3 className="text-2xl font-semibold mb-2 text-[#7FDBFF]">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <a href="#" className="mt-4 inline-block text-[#7FDBFF] hover:text-[#B3E5FC]">See more →</a>
</div>
);

export default function WhatIDo() {
return (
    <section className="my-12">
    <h2 className="text-3xl font-bold text-center mb-10 text-[#7FDBFF]">What I Do</h2>
    <div className="grid md:grid-cols-3 gap-6">
        <Card
        title="Web Development"
        description="I design and build intuitive digital products for e-commerce, portfolios, and more."
        />
        <Card
        title="Backend Integration"
        description="I lead keynotes, workshops, and mentoring sessions to help others improve their skills."
        />
        <Card
        title="Public Speaking"
        description="I lead keynotes, workshops, and mentoring sessions to help others improve their skills."
        />
    </div>
    </section>
  );
}