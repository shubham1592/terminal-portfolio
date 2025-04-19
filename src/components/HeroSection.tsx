import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Send, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onContactClick?: () => void;
}

const HeroSection = ({ onContactClick = () => {} }: HeroSectionProps) => {
  const [bootingComplete, setBootingComplete] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textLines = [
    "Hi, I'm ",
    "Shubham Kumar",
    "MS Computer Science @ Northeastern University, Boston",
    "Ex-Senior Data Engineer",
    "AI & Machine Learning Enthusiast",
  ];

  // Boot animation
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootingComplete(true);
    }, 2000);

    return () => clearTimeout(bootTimer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!bootingComplete) return;

    if (currentTextIndex < textLines.length) {
      const timer = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setTypingComplete(true);
    }
  }, [bootingComplete, currentTextIndex]);

  const downloadResume = () => {
    // Placeholder for resume download functionality
    console.log("Downloading resume...");
    // In a real implementation, this would trigger a file download
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-black text-white font-mono relative">
      {/* Background scanline effect
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px]"></div>
      </div> */}

      <div className="w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        {!bootingComplete ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-500"
          >
            <p className="text-lg sm:text-xl">Authenticating...</p>
            <p className="mt-2 text-sm sm:text-base">Booting Portfolio System...</p>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4 text-left">
            <div className="space-y-1">
              {textLines.map((line, index) => {
                if (index <= currentTextIndex) {
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`text-base sm:text-lg md:text-xl ${index === 1 ? "text-green-500 font-bold" : "text-white"}`}
                    >
                      {index === 0 ? "> " : ""}
                      {line}
                    </motion.p>
                  );
                }
                return null;
              })}

              {/* Blinking cursor */}
              {!typingComplete && currentTextIndex < textLines.length && (
                <motion.span
                  className="inline-block w-2 h-4 sm:w-3 sm:h-5 bg-green-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </div>

            {typingComplete && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={downloadResume}
                  className="w-full sm:w-auto bg-black border border-green-500 text-green-500 hover:bg-green-900/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300 text-sm sm:text-base"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>&gt; download-resume</span>
                </Button>

                <Button
                  onClick={onContactClick}
                  className="w-full sm:w-auto bg-black border border-green-500 text-green-500 hover:bg-green-900/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300 text-sm sm:text-base"
                >
                  <Send className="mr-2 h-4 w-4" />
                  <span>&gt; contact-shubham</span>
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-green-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [-10, 0, 0, 10]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
