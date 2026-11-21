import React, { useState } from "react";
import { motion } from "framer-motion";

const BeyondCodeSection = () => {
  const [isSpotifyExpanded, setIsSpotifyExpanded] = useState(false);

  const handleSpotifyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpotifyExpanded(!isSpotifyExpanded);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling to backdrop
    setIsSpotifyExpanded(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsSpotifyExpanded(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay when Spotify is expanded */}
      {isSpotifyExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 overflow-y-auto py-10"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-2xl mx-auto px-4"
          >
            <div className="bg-black border border-status">
              <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
                <span>$ Music Taste</span>
                <button
                  onClick={handleCloseClick}
                  className="text-green-400 hover:text-status transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 flex flex-col min-h-[500px]">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/5zSppxuqmXYMOaEkGZWnWO?si=Ii_wZZOGSJqJ1oRXEVYHqg"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="mt-2"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Spotify Playlist Card */}
        <motion.div
          className={`h-full flex flex-col group border border-green-900 hover:border-status transition-colors cursor-pointer ${
            isSpotifyExpanded ? "invisible" : ""
          }`}
          onClick={handleSpotifyClick}
          layout
        >
          <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
            <span>$ Music Taste</span>
            <span aria-hidden="true">♫</span>
          </div>
          <div className="p-3 sm:p-4 flex flex-col min-h-[250px]">
            <p className="text-white text-sm mb-3">
              From Rock to Lo-fi, I vibe with guitar, Indie, and everything in
              between
            </p>
            <div className="bg-black p-2 sm:p-3 mt-auto">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/5zSppxuqmXYMOaEkGZWnWO?si=Ii_wZZOGSJqJ1oRXEVYHqg&compact=1"
                width="100%"
                height="160"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="mt-2"
              ></iframe>
              <p className="text-center mt-3 text-sm">
                <span className="inline-block px-4 py-2 border border-green-700 text-green-400 group-hover:border-status group-hover:text-status transition-colors">
                  Click to expand player ↕
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chess Achievements Card */}
        <a
          href="https://lichess.org/@/Riighley"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="h-full flex flex-col group border border-green-900 hover:border-status transition-colors">
            <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
              <span>$ Chess Achievements</span>
              <span aria-hidden="true">♟</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-white text-sm mb-2 sm:mb-3">
                I play chess for almost two hours daily (Rated 1600+ on Lichess)
              </p>
              {/* board beside the link (not above it) so this card is no taller than its neighbours */}
              <div className="bg-black p-2 sm:p-3 mt-auto flex items-center gap-4">
                {/* Lichess sizes its board to (height - player bars); keep height = width + bars so the board fills the width. */}
                <div className="relative w-[136px] shrink-0" style={{ paddingBottom: "calc(136px + 40px)" }}>
                  <iframe
                    src="https://lichess.org/tv/frame?theme=brown&bg=dark"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Live chess game on Lichess TV"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <span className="text-sm px-3 py-2 border border-green-700 text-green-400 group-hover:border-status group-hover:text-status transition-colors">
                  Visit my Lichess ↗
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Guitar Performances Card */}
        <div className="h-full flex flex-col group border border-green-900 hover:border-status transition-colors">
          <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
            <span>$ Guitar Performances</span>
            <span aria-hidden="true">♪</span>
          </div>
          <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
            <p className="text-white text-sm mb-2 sm:mb-3">
              Music is to life what autoplay is to YouTube — suddenly, it's 3 AM
            </p>
            <div className="bg-black p-2 sm:p-3 mt-auto">
              <p className="text-green-500 text-sm">
                $ guitar --venues
              </p>

              <div className="mt-1 sm:mt-4 text-gray-400 text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-base text-gray-500">{">"}</span>
                  Symbiosis Design School Fest --Pune -2024, 2023
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-base text-gray-500">{">"}</span>
                  Gigs at local cafes --Pune -2022
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-base text-gray-500">{">"}</span>
                  VIT Riviera Annual Fest --Vellore -2019
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Recognition Card */}
        <div className="h-full flex flex-col group border border-green-900 hover:border-status transition-colors">
          <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
            <span>$ Hackathon Recognition</span>
            <span aria-hidden="true">★</span>
          </div>
          <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
            <p className="text-white text-sm mb-2 sm:mb-3">
              Overnight = (Caffeine + Code + Mild Panic) &gt; Wild Ideas &gt;
              Debugging &gt; Innovation (maybe)
            </p>
            <div className="bg-black p-2 sm:p-3 mt-auto">
              <p className="text-green-500 text-sm">
                $ hackathon --list-achievements
              </p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-sm break-words">
                Microsoft ChatGPT Hackathon Recognition
              </p>
              <p className="text-gray-400 text-sm break-words">
                ACM-VIT Top 10 Teams
              </p>
              <p className="text-gray-400 text-sm break-words">
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
          <div className="h-full flex flex-col group border border-green-900 hover:border-status transition-colors">
            <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
              <span>$ Blogs</span>
              <span aria-hidden="true">¶</span>
            </div>
            <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
              <p className="text-white text-sm mb-2 sm:mb-3">
                This is where my thoughts go from whispers to headlines, one
                word at a time
              </p>
              <div className="bg-black p-2 sm:p-3 mt-auto">
                <p className="text-green-500 text-sm">
                  $ open medium-profile
                </p>
                <p className="text-gray-400 mt-1 sm:mt-2 text-sm break-words">
                  Medium: 20,000+ views, 200+ followers
                </p>
                <p className="text-center mt-3 text-sm">
                  <span className="inline-block px-4 py-2 border border-green-700 text-green-400 group-hover:border-status group-hover:text-status transition-colors">
                    Click to visit my Medium ↗
                  </span>
                </p>
              </div>
            </div>
          </div>
        </a>

        {/* Certifications Card */}
        <div className="h-full flex flex-col group border border-green-900 hover:border-status transition-colors">
          <div className="hl border-b border-green-900 bg-gray-900 px-4 py-2 flex justify-between items-center gap-2">
            <span>$ Certifications</span>
            <span aria-hidden="true">§</span>
          </div>
          <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] flex flex-col">
            <p className="text-white text-sm mb-2 sm:mb-3">
              Took tests, earned badges, and still google things — but now I do
              it with authority
            </p>
            <div className="bg-black p-2 sm:p-3 mt-auto">
              <p className="text-green-500 text-sm">
                $ cert --list-all
              </p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-sm break-words">
                Azure Data Engineer Associate
              </p>
              <p className="text-gray-400 text-sm break-words">
                ML Specialization
              </p>
              <p className="text-gray-400 text-sm break-words">
                Google Cloud ML Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeyondCodeSection;
