import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import TechStackSection from "./TechStackSection";
import ContactSection from "./ContactSection";

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
        className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
          $ cat about-me.txt
        </h2>
        <div className="space-y-4 text-lg text-gray-200">
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
        className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
          $ ls -la projects/
        </h2>
        <ProjectsSection />
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
          $ Major Tech Stack
        </h2>
        <TechStackSection />
      </motion.section>

      {/* Beyond the Code Section */}
      <motion.section
        id="beyond-code"
        className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
          $ Beyond Code
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spotify Playlist Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Music Taste</span>
              <span>♫</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                From Rock to Lo-fi, I vibe with guitar, Indie, and everything in between
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ spotify --play-list="Shubham's Favorites"
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Linkin Park, Pink Floyd, The Beatles, Green Day, Twentyone Pilots, Radiohead and more.
                </p>
              </div>
            </div>
          </div>

          {/* Chess Achievements Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Chess Achievements</span>
              <span>♟</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                I play chess for almost two hours daily (Rated 1600+ on Lichess)
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ chess --tournament-stats
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Bronze medal at Bajaj Office Olympics
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  Participation in Pune SPF Chess Tournament
                </p>
              </div>
            </div>
          </div>

          {/* Guitar Performances Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Guitar Performances</span>
              <span>🎸</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                Music is to life what autoplay is to YouTube — suddenly, it's 3 AM
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ guitar --venues
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Symbiosis Cultural Fest x2 (2023, 2024)
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  VIT Riviera Fest
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  Gigs at local cafes
                </p>
              </div>
            </div>
          </div>

          {/* Hackathon Recognition Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Hackathon Recognition</span>
              <span>🏆</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                Overnight = (Caffeine + Code + Mild Panic) &gt; Wild Ideas &gt; Debugging &gt; Innovation (maybe)
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ hackathon --list-achievements
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Microsoft ChatGPT Hackathon Recognition
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  ACM-VIT Top 10 Teams
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  Venture-city Technical Head
                </p>
              </div>
            </div>
          </div>

          {/* Blogs Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Blogs</span>
              <span>✍️</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                This is where my thoughts go from whispers to headlines, one word at a time
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ blog --stats
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Medium: 20,000+ views, 200+ followers
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  BFL Blog-a-thon: 2nd Place
                </p>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
            <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
              <span>$ Certifications</span>
              <span>🎓</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
                Took tests, earned badges, and still google things — but now I do it with authority
              </p>
              <div className="bg-black p-2 sm:p-3 rounded-md mt-auto">
                <p className="text-green-300 text-xs md:text-sm">
                  $ cert --list-all
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                  Azure Data Engineer Associate
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  ML Specialization
                </p>
                <p className="text-gray-400 text-xs md:text-sm break-words">
                  Google Cloud ML Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl mb-8 border-b border-green-500 pb-2 inline-block">
          $ Contact Me
        </h2>
        <ContactSection />
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-green-400 border-t border-green-900">
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
