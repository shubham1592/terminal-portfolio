import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import "devicon/devicon.min.css";
import { Database, Cloud, Server, BarChart3, Library, Code2, Brain, Globe, Tool } from "lucide-react";

interface TechItem {
  name: string;
  command: string;
  icon: string | React.ReactNode;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const vibrantBlue = "text-[#0078D7]"; // Microsoft's vibrant blue color

const TechStackSection = () => {
  const techCategories: TechCategory[] = [
    {
      title: "Languages",
      items: [
        { name: "Python", command: "pip install python3", icon: "devicon-python-plain colored" },
        { name: "C++", command: "g++ main.cpp -o app", icon: "devicon-cplusplus-plain colored" },
        { name: "SQL", command: "SELECT * FROM users;", icon: "devicon-mysql-plain colored" },
        { name: "Scala", command: "sbt compile", icon: "devicon-scala-plain colored" },
        { name: "Go", command: "go run main.go", icon: "devicon-go-plain colored" },
      ],
    },
    {
      title: "AI & ML",
      items: [
        { name: "OpenAI", command: "pip install openai", icon: <Brain className="h-6 w-6 text-green-400" /> },
        { name: "LangChain", command: "pip install langchain", icon: <Cloud className="h-6 w-6 text-yellow-400" /> },
        { name: "VectorDB", command: "pip install chromadb", icon: <Database className="h-6 w-6 text-purple-400" /> },
        { name: "TensorFlow", command: "pip install tensorflow", icon: "devicon-tensorflow-original colored" },
        { name: "PyTorch", command: "pip install torch", icon: "devicon-pytorch-original colored" },
      ],
    },
    {
      title: "Data Engineering",
      items: [
        { name: "Databricks", command: "databricks workspace import", icon: <Server className="h-6 w-6 text-red-400" /> },
        { name: "Apache Spark", command: "spark-submit app.py", icon: "devicon-apache-plain colored" },
        { name: "Delta Lake", command: "LOAD DATA delta.`/path/to/table`", icon: <Database className="h-6 w-6 text-blue-500" /> },
        { name: "ADLS", command: "az storage fs create", icon: <Cloud className="h-6 w-6 text-blue-500" /> },
        { name: "ADF", command: "az datafactory pipeline create", icon: <Server className="h-6 w-6 text-blue-500" /> },
        { name: "Synapse", command: "az synapse workspace create", icon: <Database className="h-6 w-6 text-purple-500" /> },
        { name: "Oracle", command: "sqlplus user/password@DB", icon: "devicon-oracle-plain colored" },
      ],
    },
    {
      title: "Web & App Dev",
      items: [
        { name: "React", command: "npx create-react-app myapp", icon: "devicon-react-original colored" },
        { name: "Node.js", command: "node app.js", icon: "devicon-nodejs-plain colored" },
        { name: "Firebase", command: "firebase deploy", icon: "devicon-firebase-plain colored" },
        { name: "MongoDB", command: "mongod --dbpath /data/db", icon: "devicon-mongodb-plain colored" },
        { name: "Kotlin", command: "kotlinc hello.kt", icon: "devicon-kotlin-plain colored" },
        { name: "Dart", command: "flutter create myapp", icon: "devicon-dart-plain colored" },
        { name: "HTML/CSS", command: "npm run build", icon: "devicon-html5-plain colored" },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Git", command: 'git commit -m "init project"', icon: "devicon-git-plain colored" },
        { name: "Postman", command: "newman run collection.json", icon: "devicon-postman-plain colored" },
        { name: "VS Code", command: "code .", icon: "devicon-vscode-plain colored" },
        { name: "Jupyter", command: "jupyter notebook", icon: "devicon-jupyter-plain colored" },
        { name: "Anaconda", command: "conda create --name myenv", icon: "devicon-anaconda-plain colored" },
        { name: "Power BI", command: "powerbi publish", icon: <BarChart3 className="h-6 w-6 text-yellow-500" /> },
        { name: "Docker", command: "docker build -t myapp .", icon: "devicon-docker-plain colored" },
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
      className="pt-4 sm:pt-6 lg:pt-8 pb-2 bg-black min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
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
                            {typeof tech.icon === 'string' ? (
                              <i className={`${tech.icon} text-4xl mb-2`}></i>
                            ) : (
                              <div className="mb-2">
                                {tech.icon}
                              </div>
                            )}
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
