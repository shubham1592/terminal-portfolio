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
  githubLink?: string;
  demoLink?: string;
  type: "academic" | "professional";
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      name: "Chess Engine with Parallel Computing",
      description:
        "AI engine using Minimax, MCTS, and parallel processing with OpenMP & Python",
      techStack: ["Python", "OpenMP", "AI", "Minimax", "MCTS"],
      icon: <Code className="h-6 w-6 text-green-400" />,
      githubLink: "https://github.com/username/chess-engine",
      type: "academic",
    },
    {
      id: 2,
      name: "My Music Kart",
      description:
        "Full-stack e-commerce web app for music academy with PayUmoney integration",
      techStack: ["React", "Node.js", "MongoDB", "PayUmoney"],
      icon: <ShoppingCart className="h-6 w-6 text-green-400" />,
      githubLink: "https://github.com/username/music-kart",
      demoLink: "https://music-kart-demo.com",
      type: "academic",
    },
    {
      id: 3,
      name: "ShoutOut",
      description:
        "Android social media app with ChatGPT-based content suggestions",
      techStack: ["Kotlin", "Firebase", "OpenAI API", "Android"],
      icon: <MessageSquare className="h-6 w-6 text-green-400" />,
      githubLink: "https://github.com/username/shoutout",
      type: "academic",
    },
    {
      id: 4,
      name: "Sensei – AI Onboarding Assistant",
      description:
        "An AI-powered tool to automate knowledge transfer for new joiners. Built using GPT-4o and LangChain. Finalist in BFL's internal Shark Tank.",
      techStack: ["LangChain", "GPT-4o Mini API", "Vector DB", "PDF Parser"],
      icon: <Database className="h-6 w-6 text-green-400" />,
      type: "professional",
    },
    {
      id: 5,
      name: "Data Lake Green Room Optimization",
      description:
        "Cost-saving framework using Spark, vacuum/merge, and automation",
      techStack: ["Apache Spark", "Azure", "Data Lake", "Python"],
      icon: <Server className="h-6 w-6 text-green-400" />,
      type: "professional",
    },
    {
      id: 6,
      name: "Oracle Reconciliation + Alert Framework",
      description:
        "Automated alert system using Databricks, SMTP, and pyMsTeams",
      techStack: ["Databricks", "Oracle", "SMTP", "Python", "pyMsTeams"],
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
        className="w-full max-w-6xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-green-400 mb-4">
          <span className="text-green-400 mr-2">$</span>
          <span className="typing-cursor">projects</span>
        </h2>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">
          &gt; ls -la ~/projects | grep "featured"
        </p>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-mono text-green-400 mb-4">
            <span className="text-green-400 mr-2">&gt;</span>
            Academic Projects
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects
              .filter((project) => project.type === "academic")
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
      <Card className="h-full bg-black border border-green-900 hover:border-green-400 transition-all duration-300 overflow-hidden group relative hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] cursor-pointer">
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

        <CardContent className="pt-4 pb-2 font-mono">
          <CardDescription className="text-gray-400 mb-4 min-h-[60px]">
            {project.description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mt-2">
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

        <CardFooter className="flex justify-end space-x-2 pt-2 pb-4">
          {project.githubLink && (
            <Button
              variant="outline"
              size="sm"
              className="bg-black border-green-700 text-green-400 hover:bg-green-900/20 hover:text-green-300 font-mono text-xs group"
              asChild
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-1 h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
          )}

          {project.demoLink && (
            <Button
              variant="outline"
              size="sm"
              className="bg-black border-green-700 text-green-400 hover:bg-green-900/20 hover:text-green-300 font-mono text-xs group"
              asChild
            >
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                <span>Demo</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectsSection;
