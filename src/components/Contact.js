import React from 'react';

export default function Contact() {
    return (
    <section className="my-12 p-6 bg-black/50 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#7FDBFF]">Contact</h2>
        <p className="text-center text-gray-300 mb-6">Do you have an idea or want to collaborate?</p>
        
        <form className="max-w-lg mx-auto">
        <div className="mb-4">
            <input type="text" placeholder="Name" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#7FDBFF]" />
        </div>
        <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#7FDBFF]" />
        </div>
        <div className="mb-4">
            <textarea rows="4" placeholder="Write your message here" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#7FDBFF]"></textarea>
        </div>
        <div className="text-center">
            <button type="submit" className="bg-[#7FDBFF] hover:bg-[#B3E5FC] text-white px-6 py-3 rounded-lg font-bold transition">Send</button>
        </div>
    </form>
    </section>
);
}