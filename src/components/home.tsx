import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import TechStackSection from "./TechStackSection";
import ContactSection from "./ContactSection";
import BeyondCodeSection from "./BeyondCodeSection";

const Home = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <HeroSection />
      </section>

      {/* About Me Section */}
      <motion.section
        id="about"
        className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto" // Updated to match other sections
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-6 border-b border-green-500 pb-2 inline-block">
          $ cat about-me.txt
        </h2>
        <div className="space-y-4 text-lg text-gray-200 pl-8 pt-10"> {/* Added pl-8 for indentation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            I'm a{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              Senior Data Engineer
            </span>{" "}
            turned{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              MS in Computer Science
            </span>{" "}
            student.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I build scalable systems powered by{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              AI
            </span>{" "}
            and{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              Machine Learning
            </span>
            .
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            I enjoy simplifying complexity through{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              clean code
            </span>
            .
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Outside work, I'm a{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              guitarist
            </span>
            ,{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              blogger
            </span>
            , and{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              chess player
            </span>
            .
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            I believe good tech should feel like{" "}
            <span className="terminal-keyword text-green-400 font-bold shadow-glow">
              magic
            </span>
            .
          </motion.p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-6 border-b border-green-500 pb-2 inline-block">
          $ ls -la projects/all | grep "featured"
        </h2>
        <ProjectsSection />
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-6 border-b border-green-500 pb-2 inline-block">
          $ major-tech-stack --list-all
        </h2>
        <TechStackSection />
      </motion.section>

      {/* Beyond the Code Section */}
      <motion.section
        id="beyond-code"
        className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-6 border-b border-green-500 pb-2 inline-block">
          $ cat beyond-code/life | grep "fun"
        </h2>
        <BeyondCodeSection />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-6 border-b border-green-500 pb-2 inline-block">
          $ contact-me --send-message
        </h2>
        <ContactSection />
      </motion.section>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-green-400 border-t border-green-900">
        <p>© {new Date().getFullYear()} Shubham Kumar. All rights reserved.</p>
        <p className="mt-2">
          Built with React, Tailwind CSS, and Framer Motion
        </p>
      </footer>

      {/* Spacer to prevent dock from covering footer */}
      <div className="h-16"></div>

      {/* Fixed Navigation */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-green-500 rounded-full px-2 sm:px-4 py-2 z-50 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 max-w-[90vw] overflow-x-auto group hover:scale-105 hover:py-3">
        <ul className="flex space-x-2 sm:space-x-4 text-xs sm:text-sm whitespace-nowrap">
          <li>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#tech-stack"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("tech-stack")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              Tech
            </a>
          </li>
          <li>
            <a
              href="#beyond-code"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("beyond-code")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              Beyond
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-green-300 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:scale-125 inline-block px-1 rounded cursor-pointer"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;