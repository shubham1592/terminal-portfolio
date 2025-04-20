import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BeyondCodeSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* Spotify Playlist Card */}
      <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
        <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
          <span>$ Music Taste</span>
          <span>♫</span>
        </div>
        <div className="p-3 sm:p-4 flex flex-col min-h-[450px]">
          <iframe 
            style={{borderRadius: '12px'}}
            src="https://open.spotify.com/embed/playlist/5zSppxuqmXYMOaEkGZWnWO?si=Ii_wZZOGSJqJ1oRXEVYHqg" 
            width="100%" 
            height="380" 
            frameBorder="0" 
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="mt-2"
          ></iframe>
        </div>
      </div>

      {/* Chess Achievements Card */}
      <a 
        href="https://lichess.org/@/Riighley" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block"
      >
        <div className="bg-gray-900 border border-green-500 rounded-md overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform">
          <div className="bg-green-500 text-black px-4 py-2 font-bold flex justify-between items-center">
            <span>$ Chess Achievements</span>
            <span>♟</span>
          </div>
          <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
            <p className="text-green-400 text-sm md:text-base mb-2 sm:mb-3">
              I play chess for almost two hours daily (Rated 1600+ on Lichess)
            </p>
            <iframe 
              src="https://lichess.org/@/Riighley/mini" 
              width="100%" 
              height="226" 
              frameBorder="0"
              className="mb-2"
              allowTransparency={true}
            ></iframe>
            <div className="bg-black p-2 rounded-md mt-auto">
              <p className="text-gray-400 text-xs md:text-sm break-words">
                Click to visit my profile ↗
              </p>
            </div>
          </div>
        </div>
      </a>

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
      <a 
        href="https://medium.com/@pi-shubham" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block"
      >
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
                $ open medium-profile
              </p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs md:text-sm break-words">
                Medium: 20,000+ views, 200+ followers
              </p>
              <p className="text-gray-400 text-xs md:text-sm break-words">
                Click to visit profile ↗
              </p>
            </div>
          </div>
        </div>
      </a>

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
  );
};

export default BeyondCodeSection;