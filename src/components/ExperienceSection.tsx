import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ExperienceRoleProps {
  title: string;
  date: string;
  items: React.ReactNode[];
  badges: string[];
  value: string;
}

const ExperienceRole: React.FC<ExperienceRoleProps> = ({ title, date, items, badges, value }) => (
  <AccordionItem value={value} className="border-none">
    <AccordionTrigger className="hover:no-underline group py-2 transition-all duration-300">
      <div className="flex items-baseline space-x-2 text-lg w-full">
        <span className={`text-green-500 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90`}>&gt;</span>
        <span className="text-green-500 shrink-0">$</span>
        <span className="text-green-500 shrink-0">ls</span>
        <span className="text-white/90 group-hover:text-green-300">{title}</span>
        <span className="text-green-500/70 text-base ml-1">//{" "}{date}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="pl-7 ml-2 border-l border-green-900/30 mt-1 mb-2"
      >
        <ul className="list-none space-y-3 text-white/90 text-base">
          {items.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {badges.map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-black/50 border-green-700 text-green-400 font-mono text-xs hover:bg-green-900/20"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>
    </AccordionContent>
  </AccordionItem>
);

const ExperienceSection = () => {
  return (
    <section className="w-full max-w-[800px] mx-auto font-mono">
      <h2 className="text-3xl mb-12 text-green-500 font-mono"> </h2>
      <Accordion type="single" className="space-y-4" defaultValue="bajaj-finserv">
        <AccordionItem value="bajaj-finserv" className="border-none">
          <AccordionTrigger className="hover:no-underline group py-2">
            <div className="flex items-baseline space-x-2 text-lg w-full">
              <span className="text-green-500 shrink-0">▼</span>
              <span className="text-green-500 shrink-0">$</span>
              <span className="text-green-500 shrink-0">cd</span>
              <span className="text-white/90 group-hover:text-green-300">Bajaj Finserv Ltd.</span>
              <span className="text-green-500/70 text-base ml-1">//  January 2022 - August 2025</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="pl-7 space-y-1">
              <Accordion type="multiple" className="space-y-1">
                <ExperienceRole
                  value="bajaj-senior"
                  title="Senior Data Engineer"
                  date="July 2024 - August 2025"
                  items={[
                    <>Developed <span className="text-green-400">AI-powered PDF pipeline</span> with <span className="text-green-400">OCR + DMS API</span>; enabled structured insights from <span className="text-green-400">100K+ documents</span>.</>,
                    <>Led <span className="text-green-400">automation</span> of month-end workflows, reducing processing time by <span className="text-green-400">67%</span> and eliminating manual intervention.</>,
                    <>Built <span className="text-green-400">SENSEI</span>: A <span className="text-green-400">Gen AI-powered KT platform</span> for personalized learning paths, accelerating onboarding by <span className="text-green-400">80%</span>.</>,
                    <>Developed <span className="text-green-400">"Green Room"</span>: a data compliance project enhancing data security by over <span className="text-green-400">95%</span>.</>
                  ]}
                  badges={["AI/ML", "Python", "OCR", "DMS", "Automation", "Gen AI", "Data Security"]}
                />

                <ExperienceRole
                  value="bajaj-engineer"
                  title="Data Engineer"
                  date="July 2022 - July 2024"
                  items={[
                    <>Developed <span className="text-green-400">robust ETL framework</span> using <span className="text-green-400">ADF + Databricks</span> for Oracle to Data Lake ingestion.</>,
                    <>Implemented <span className="text-green-400">daily job</span> on <span className="text-green-400">serverless cluster</span> for vector embedding & chatbot integration using <span className="text-green-400">Azure OpenAI</span>.</>,
                    <>Optimized <span className="text-green-400">data migration</span> by <span className="text-green-400">50%</span> using <span className="text-green-400">PySpark</span> and <span className="text-green-400">Spark SQL</span>.</>,
                    <>Developed an <span className="text-green-400">Alert-Framework</span> minimizing <span className="text-green-400">80%</span> downtime of Oracle GoldenGate processes.</>
                  ]}
                  badges={["ETL", "ADF", "Databricks", "Azure OpenAI", "PySpark", "Spark SQL", "Oracle"]}
                />

                <ExperienceRole
                  value="bajaj-intern"
                  title="Data Engineer Intern"
                  date="January 2022 - July 2022"
                  items={[
                    <>Built <span className="text-green-400">JSON parsing framework</span> to support audit teams in validating critical report data.</>,
                    <>Developed <span className="text-green-400">data reconciliation tools</span> to verify quality and quantity of data between Oracle sources and Data Lake.</>,
                    <>Created <span className="text-green-400">Power BI dashboards</span> using <span className="text-green-400">SQL Server</span> to visualize real-time operational metrics, improving decision-making efficiency.</>
                  ]}
                  badges={["JSON", "Python", "Oracle", "Data Lake", "Power BI", "SQL Server", "Data Validation"]}
                />
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 text-base pl-1">
        <span className="text-green-500">pwd:</span>{" "}
        <span className="text-green-500/70">Central Data Lake Team</span>
      </div>
    </section>
  );
};

export default ExperienceSection;