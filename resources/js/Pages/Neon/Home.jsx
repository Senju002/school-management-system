import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full flex justify-between p-6 bg-black/80 backdrop-blur-md">
                <h1 className="text-2xl font-bold neon-text">MyPortfolio</h1>
                <div className="space-x-6">
                    <Link href="#about" className="hover:text-purple-400">
                        About
                    </Link>
                    <Link href="#projects" className="hover:text-purple-400">
                        Projects
                    </Link>
                    <Link href="#skills" className="hover:text-purple-400">
                        Skills
                    </Link>
                    <Link href="#contact" className="hover:text-purple-400">
                        Contact
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-screen text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-extrabold neon-text"
                >
                    Welcome to My Cyberpunk Portfolio
                </motion.h1>
                <p className="text-lg text-gray-400 mt-4">
                    Full-Stack Developer | Tech Enthusiast
                </p>
                <Link href="#contact">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="mt-6 px-6 py-3 bg-purple-500 text-black font-semibold rounded-lg shadow-lg hover:bg-purple-400 transition"
                    >
                        Get in Touch
                    </motion.button>
                </Link>
            </section>
        </div>
    );
}
