import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Database,
  Server,
  Music,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  icon: React.ReactNode;
  type: "personal" | "professional";
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: "Deep Level Chess Engine",
      description:
        "Chess engine made using Minimax, pruning, MCTS, and parallel processing with OpenMP that is able to go as deep as 8 parallel evaluation states.",
      techStack: ["Python", "OpenMP", "Futures", "Pruning", "MCTS", "MiniMax"],
      icon: <Code className="h-6 w-6 text-green-400" />,
      type: "personal",
    },
    {
      id: 2,
      name: "My Music Kart",
      description:
        "Full-stack e-commerce web app for my music academy with PayUmoney integration that helps with selling music instruments and enrolling new admits to the academy",
      techStack: ["React", "Node.js", "MongoDB", "PayUmoney", "HTML", "CSS"],
      icon: <ShoppingCart className="h-6 w-6 text-green-400" />,
      type: "personal",
    },
    {
      id: 3,
      name: "ShoutOut",
      description:
        "Android social media app with ChatGPT-based content and comment suggestions, enables like, share, follow other users and chat with them within the app.",
      techStack: ["Android Studio", "Kotlin", "Firebase", "GPT-4o-mini"],
      icon: <MessageSquare className="h-6 w-6 text-green-400" />,
      type: "personal",
    },
    {
      id: 4,
      name: "Sensei",
      description:
        "An AI-powered framework to automate knowledge transfer for new joiners, powered by GPT-4o-mini api. Finalist in BFL Shark Tank - 2025.",
      techStack: ["Python", "Databricks", "ChromaDB", "LangChain", "Hive Metastore", "Vector DB", "React", "Node.js"],
      icon: <Database className="h-6 w-6 text-green-400" />,
      type: "professional",
    },
    {
      id: 5,
      name: "Green Room",
      description:
        "Cost-saving framework using Spark, vacuum/merge, and automation along with PII and Non-PII user seclusion in unity catalog to maintain secure compliance with personal user information among shared tables.",
      techStack: ["Databricks", "Python", "Azure", "Apache Spark", "ADLS", "ADF"],
      icon: <Server className="h-6 w-6 text-green-400" />,
      type: "professional",
    },
    {
      id: 6,
      name: "Reconciliation Framework",
      description:
        "Robust framework for reconciliation of data lake with oracle sources in real time for both quantitative and qualitative matching along with alert system.",
      techStack: ["Databricks", "Python", "SQL", "ADF", "ADLS", "SMTP", "Oracle", "pymsteams", "PowerBI"],
      icon: <Database className="h-6 w-6 text-green-400" />,
      type: "professional",
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
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-16 px-4 md:px-8 bg-black min-h-screen flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto text-center mb-8"
      >
      </motion.div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-mono text-green-400 mb-4">
            <span className="text-green-400 mr-2">&gt;</span>
            Personal Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects
              .filter((project) => project.type === "personal")
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variants={itemVariants}
                />
              ))}
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-mono text-green-400 mb-4">
            <span className="text-green-400 mr-2">&gt;</span>
            Professional Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects
              .filter((project) => project.type === "professional")
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variants={itemVariants}
                />
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  variants: any;
}

const ProjectCard = ({ project, variants }: ProjectCardProps) => {
  return (
    <motion.div variants={variants}>
      <Card className="h-full bg-black border border-green-900 hover:border-green-400 transition-all duration-300 overflow-hidden group relative hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] cursor-pointer flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="bg-green-900/20 border-b border-green-900 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {project.icon}
              <CardTitle className="text-green-400 font-mono text-lg">
                {project.name}
              </CardTitle>
            </div>
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col pt-4 pb-4 font-mono">
          <CardDescription className="text-gray-400 mb-4 min-h-[60px] flex-grow">
            {project.description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-black border-green-700 text-green-400 font-mono text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsSection;
