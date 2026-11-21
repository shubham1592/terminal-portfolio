import type { BrandName } from "@/lib/brands";

// Single source of truth for site content. The page and the interactive shell both read this.
// Text wrapped in **double stars** is rendered as a highlight.

export const links = {
  email: "pi.shubham1592@gmail.com",
  linkedin: "https://www.linkedin.com/in/shubham1592/",
  github: "https://github.com/shubham1592",
  medium: "https://medium.com/@pi-shubham",
  lichess: "https://lichess.org/@/Riighley",
  resume: `${import.meta.env.BASE_URL}Shubham_Kumar_Resume.pdf`,
};

export const hero = {
  name: "Shubham Kumar",
  lines: [
    "Software engineer working on backend, data and distributed systems.",
    "Software Engineer Co-op @ LG Energy Solution Vertech",
    "MS Computer Science @ Northeastern University, Boston",
  ],
};

export const about = [
  "I build **backend and data systems** that hold up in production: APIs, pipelines and the plumbing between them.",
  "Right now I'm a Software Engineer Co-op at **LG Energy Solution Vertech**, building FastAPI services over telemetry data with **43M+ rows per site**.",
  "Before grad school I spent three years as a data engineer at **Bajaj Finance**, moving a **500TB** database to a cloud data lake and shipping a RAG search over 10,000+ documents.",
  "Studying for an MS in Computer Science at **Northeastern**, graduating May 2027.",
  "Looking for **full-time software engineering roles** starting 2027.",
  "Guitarist, blogger, and a pretty decent chess player.",
];

export const education = [
  { degree: "MS, Computer Science", school: "Northeastern University, Boston", date: "Expected May 2027" },
  { degree: "B.Tech, Computer Science", school: "Vellore Institute of Technology, India", date: "July 2022" },
];

export interface Role {
  id: string;
  title: string;
  company: string;
  place: string;
  date: string;
  items: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    id: "lges",
    title: "Software Engineer Co-op",
    company: "LG Energy Solution Vertech",
    place: "Westborough, MA",
    date: "June 2026 – December 2026",
    items: [
      "Designed hierarchical **REST APIs with FastAPI** for a multi-service platform, replacing static data structures with scoped endpoints, parallelizing AWS S3 ingestion over a 20-thread pool, and adding throttles to protect 3GB runtime containers.",
      "Moved aggregation logic for telemetry reporting (**43M+ rows per site**) into SQL workflows, removing the memory overhead and bringing processing latency **under 1 second**.",
      "Made the platform stable under concurrent load with a **thread-safe connection pool** that health-checks and replaces sessions, plus bounded frontend caches that cut redundant API calls.",
      "Built a **Python data quality framework** that tracks telemetry completeness across metadata hierarchies, giving model validation teams an end-to-end view of system integrity.",
    ],
    tags: ["FastAPI", "Python", "AWS S3", "SQL", "Concurrency", "Data Quality"],
  },
  {
    id: "bajaj",
    title: "Data Engineer",
    company: "Bajaj Finance Ltd.",
    place: "Pune, India",
    date: "July 2022 – August 2025",
    items: [
      "Migrated a **500TB** legacy production database to a cloud data lake and designed custom partitioning, cutting query latency by **40%**.",
      "Built backend pipelines in Java, Python and Spark for high-throughput financial data, with CI/CD deployments that cut pipeline failures by **60%** and compute by **50%**.",
      "Worked with data scientists and product managers on feature pipelines and experiment tracking to ship **3 production ML services**.",
      "Designed and deployed a production **RAG application** with LangChain, vector stores and LLM APIs over 10,000+ documents, speeding up query resolution by **65%**.",
    ],
    tags: ["Spark", "Java", "Python", "Azure Data Lake", "CI/CD", "LangChain", "RAG"],
  },
];

export interface Project {
  name: string;
  date?: string;
  description: string;
  tech: string[];
  kind: "personal" | "work";
  // Fill these in to show links on the card and in the shell.
  code?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    name: "Hybrid AI Chess Engine",
    date: "2026-02",
    description:
      "Chess engine that pairs tree search with custom PyTorch networks trained on 100K+ positions: 35% higher win rate and 4x faster inference, backed by a regression benchmark over 500+ standard positions.",
    tech: ["Python", "PyTorch", "OOP", "Benchmarking"],
    kind: "personal",
  },
  {
    name: "Campus Cravings",
    date: "2025-12",
    description:
      "Backend for a campus food delivery platform: REST APIs on an 11-table normalized Postgres schema with row-level security, and an async hybrid recommender with A/B testing that beat precision baselines by 25%.",
    tech: ["Python", "Flask", "Postgres", "REST"],
    kind: "personal",
  },
  {
    name: "ShoutOut",
    description:
      "Android social app with GPT-suggested posts and comments. Like, share, follow and chat with other users in the app.",
    tech: ["Kotlin", "Android", "Firebase", "GPT-4o-mini"],
    kind: "personal",
  },
  {
    name: "My Music Kart",
    description:
      "Full-stack e-commerce site for my music academy with PayUmoney payments, for selling instruments and enrolling new students.",
    tech: ["React", "Node.js", "MongoDB", "PayUmoney"],
    kind: "personal",
  },
  {
    name: "Sensei",
    description:
      "AI knowledge-transfer platform that builds personalized learning paths for new joiners, cutting onboarding time by 80%. Finalist in BFL Shark Tank 2025.",
    tech: ["Python", "Databricks", "ChromaDB", "LangChain", "React", "Node.js"],
    kind: "work",
  },
  {
    name: "Green Room",
    description:
      "Data compliance framework that separates PII from non-PII data in Unity Catalog for shared tables, with Spark vacuum/merge automation to cut storage cost.",
    tech: ["Databricks", "Spark", "Azure", "ADLS", "ADF"],
    kind: "work",
  },
  {
    name: "Reconciliation Framework",
    description:
      "Real-time reconciliation between the data lake and Oracle sources, matching both counts and content, with alerts on mismatch.",
    tech: ["Databricks", "Python", "SQL", "ADF", "Oracle", "Power BI"],
    kind: "work",
  },
];

export interface Skill {
  name: BrandName; // must have a logo in src/lib/brands.tsx
  command: string;
}

export const skills: { title: string; items: Skill[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "Java", command: "javac Main.java" },
      { name: "Python", command: "python3 -m venv .venv" },
      { name: "SQL", command: "SELECT * FROM telemetry;" },
      { name: "C/C++", command: "g++ -O2 main.cpp" },
      { name: "TypeScript", command: "tsc --noEmit" },
      { name: "JavaScript", command: "node index.js" },
      { name: "Scala", command: "sbt compile" },
    ],
  },
  {
    title: "Backend & distributed systems",
    items: [
      { name: "FastAPI", command: "uvicorn app:app" },
      { name: "Flask", command: "flask run" },
      { name: "Kafka", command: "kafka-console-consumer --topic events" },
      { name: "Spark", command: "spark-submit job.py" },
      { name: "Airflow", command: "airflow dags trigger etl" },
      { name: "Hadoop", command: "hdfs dfs -ls /" },
      { name: "Snowflake", command: "snowsql -q 'SHOW WAREHOUSES'" },
      { name: "Databricks", command: "databricks jobs run-now" },
    ],
  },
  {
    title: "Cloud & databases",
    items: [
      { name: "AWS", command: "aws s3 sync ./data s3://bucket" },
      { name: "Postgres", command: "psql -d app" },
      { name: "Azure Data Lake", command: "az storage fs create" },
      { name: "BigQuery", command: "bq query 'SELECT 1'" },
      { name: "Docker", command: "docker compose up" },
      { name: "Kubernetes", command: "kubectl get pods" },
      { name: "Oracle", command: "sqlplus app@ORCL" },
      { name: "Azure Data Factory", command: "az datafactory pipeline create-run" },
    ],
  },
  {
    title: "Machine learning & AI",
    items: [
      { name: "PyTorch", command: "torch.compile(model)" },
      { name: "scikit-learn", command: "pip install scikit-learn" },
      { name: "NumPy", command: "import numpy as np" },
      { name: "pandas", command: "import pandas as pd" },
      { name: "LangChain", command: "pip install langchain" },
      { name: "RAG & LLM APIs", command: "retriever.invoke(query)" },
      { name: "Vector DBs", command: "chromadb.Client().create_collection('docs')" },
    ],
  },
  {
    title: "Web & mobile",
    items: [
      { name: "React", command: "npm create vite@latest" },
      { name: "Node.js", command: "node server.js" },
      { name: "MongoDB", command: "mongosh" },
      { name: "Kotlin", command: "./gradlew assembleDebug" },
      { name: "Android", command: "adb install app.apk" },
      { name: "Firebase", command: "firebase deploy" },
    ],
  },
  {
    title: "Practices & tools",
    items: [
      { name: "Git", command: 'git commit -m "ship it"' },
      { name: "CI/CD", command: "gh workflow run deploy" },
      { name: "Power BI", command: "refresh dataset --all" },
      { name: "System design", command: "draw boxes --then arrows" },
      { name: "OOP & DSA", command: "make clean && make" },
    ],
  },
];

/** Strip **highlight** markers for plain-text output (the shell). */
export const plain = (s: string) => s.replace(/\*\*/g, "");
