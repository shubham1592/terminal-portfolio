import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface TechItem {
  name: string;
  command: string;
  icon?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const TechStackSection = () => {
  const techCategories: TechCategory[] = [
    {
      title: "Languages",
      items: [
        { name: "Python", command: "pip install python3", icon: "🐍" },
        { name: "C++", command: "g++ -std=c++17 main.cpp", icon: "⚙️" },
        { name: "JavaScript", command: "npm init", icon: "📜" },
        { name: "Kotlin", command: "kotlinc file.kt", icon: "📱" },
        { name: "Dart", command: "flutter create myapp", icon: "🎯" },
        { name: "Rust", command: "cargo new project", icon: "🦀" },
        { name: "Java", command: "javac Main.java", icon: "☕" },
        { name: "Go", command: "go build", icon: "🐹" },
        { name: "Scala", command: "sbt compile", icon: "📊" },
        { name: "C#", command: "dotnet new console", icon: "🔷" },
      ],
    },
    {
      title: "Frameworks/Tools",
      items: [
        { name: "Node.js", command: "node server.js", icon: "🟢" },
        { name: "Firebase", command: "firebase deploy", icon: "🔥" },
        { name: "OpenAI API", command: "pip install openai", icon: "🤖" },
        {
          name: "Git",
          command: 'git commit -m "feat: add new feature"',
          icon: "📂",
        },
        { name: "JWT", command: "npm install jsonwebtoken", icon: "🔑" },
        { name: "SQL", command: "SELECT * FROM users", icon: "📊" },
      ],
    },
    {
      title: "Cloud & Data",
      items: [
        { name: "Apache Spark", command: "spark-submit app.py", icon: "⚡" },
        {
          name: "PySpark",
          command: "pyspark --packages org.apache.spark:spark-sql-kafka",
          icon: "🐍⚡",
        },
        { name: "Azure", command: "az login", icon: "☁️" },
        { name: "ADF", command: "az datafactory pipeline create", icon: "🏭" },
        {
          name: "Databricks",
          command: "databricks workspace import",
          icon: "📊",
        },
        {
          name: "Data Lake",
          command: "az storage fs directory create",
          icon: "💾",
        },
        {
          name: "Unity Catalog",
          command: "databricks unity-catalog create",
          icon: "📚",
        },
        { name: "Oracle GoldenGate", command: "ggsci", icon: "🔄" },
        { name: "Power BI", command: "powerbi publish", icon: "📈" },
        { name: "Postman", command: "newman run collection.json", icon: "📬" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="tech-stack"
      className="py-20 bg-black min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-[#39FF14] mb-4">
          <span className="text-white">$</span> Major Tech Stack
        </h2>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          &gt; A collection of technologies I've worked with and mastered over
          the years
        </p>
      </motion.div>

      <div className="w-full max-w-6xl">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12"
          >
            <h3 className="text-xl font-mono font-semibold text-white mb-6 border-b border-[#39FF14]/30 pb-2">
              <span className="text-[#39FF14]">&gt;&gt;</span> {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.items.map((tech, techIndex) => (
                <motion.div key={tech.name} variants={itemVariants}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card className="bg-black border border-[#39FF14]/20 hover:border-[#39FF14] transition-all duration-300 cursor-pointer h-full">
                          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                            <div className="text-2xl mb-2">{tech.icon}</div>
                            <div className="font-mono text-sm text-white text-center">
                              {tech.name}
                            </div>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black border border-[#39FF14] text-[#39FF14] font-mono p-2">
                        <p className="text-xs">&gt; {tech.command}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
