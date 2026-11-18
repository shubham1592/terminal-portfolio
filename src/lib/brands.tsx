import type { ReactNode } from "react";
import {
  siAndroid,
  siApacheairflow,
  siApachehadoop,
  siApachekafka,
  siApachespark,
  siCplusplus,
  siDatabricks,
  siDocker,
  siFastapi,
  siFirebase,
  siFlask,
  siGit,
  siGithub,
  siGithubactions,
  siGmail,
  siGooglebigquery,
  siJavascript,
  siKotlin,
  siKubernetes,
  siLangchain,
  siMongodb,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siScala,
  siScikitlearn,
  siSnowflake,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Binary, BrainCircuit, Boxes, Database, Network } from "lucide-react";
// Brands Simple Icons removed at the owners' request come from devicon's SVGs instead.
import javaSvg from "devicon/icons/java/java-plain.svg?raw";
import awsSvg from "devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg?raw";
import azureSvg from "devicon/icons/azure/azure-plain.svg?raw";
import oracleSvg from "devicon/icons/oracle/oracle-original.svg?raw";
import linkedinSvg from "devicon/icons/linkedin/linkedin-plain.svg?raw";

export interface Brand {
  color: string; // hover colour, already lightened if the official one is too dark for the screen
  svg: ReactNode;
  size?: string; // overrides the icon box, e.g. for wide wordmarks
  bold?: boolean; // thicken thin logos so they read at icon size
}

const hexToRgb = (hex: string) => [0, 2, 4].map((i) => parseInt(hex.replace("#", "").slice(i, i + 2), 16));

const luminance = (rgb: number[]) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Mix a too-dark brand colour toward white just until it reads on the dark screen. */
export const visibleOnDark = (hex: string, min = 0.16) => {
  let rgb = hexToRgb(hex);
  for (let t = 0; luminance(rgb) < min && t < 20; t++) rgb = rgb.map((c) => Math.round(c + (255 - c) * 0.1));
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

// Self-check: bright colours untouched, near-black lifted.
console.assert(visibleOnDark("#E25A1C") === "#e25a1c" && luminance(hexToRgb(visibleOnDark("#181717"))) >= 0.16, "visibleOnDark");

const si = (icon: SimpleIcon): Brand => ({
  color: visibleOnDark(`#${icon.hex}`),
  svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  ),
});

// devicon SVGs are trusted local package files; their fills are stripped so they take currentColor.
const dev = (raw: string, officialHex: string, viewBox?: string): Brand => {
  let html = raw.replace(/\sfill="[^"]*"/g, "");
  if (viewBox) html = html.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`);
  return {
    color: visibleOnDark(officialHex),
    svg: <span className="brand-dev contents" dangerouslySetInnerHTML={{ __html: html }} />,
  };
};

const bold = (b: Brand): Brand => ({ ...b, bold: true });

const generic = (svg: ReactNode): Brand => ({ color: "rgb(var(--status))", svg });

export const brands: Record<string, Brand> = {
  // Languages
  Java: dev(javaSvg, "#ED8B00"), // Oracle Java brand orange
  Python: si(siPython),
  SQL: generic(<Database />), // a language, not a brand
  "C/C++": si(siCplusplus),
  TypeScript: si(siTypescript),
  JavaScript: si(siJavascript),
  Scala: si(siScala),
  // Backend & distributed systems
  FastAPI: si(siFastapi),
  Flask: si(siFlask),
  Kafka: si(siApachekafka),
  Spark: si(siApachespark),
  Airflow: bold(si(siApacheairflow)),
  Hadoop: bold(si(siApachehadoop)),
  Snowflake: si(siSnowflake),
  Databricks: si(siDatabricks),
  // Cloud & databases
  AWS: dev(awsSvg, "#FF9900"), // AWS "Squid Ink & Smile" orange
  Postgres: si(siPostgresql),
  "Azure Data Lake": dev(azureSvg, "#0078D4"), // Azure blue
  BigQuery: si(siGooglebigquery),
  Docker: si(siDocker),
  Kubernetes: si(siKubernetes),
  // Oracle's mark is its wordmark: crop devicon's square canvas to the text and give it a wide box.
  Oracle: { ...dev(oracleSvg, "#F80000", "2 52 124 24"), size: "h-9 w-24" }, // Oracle red
  "Azure Data Factory": dev(azureSvg, "#0078D4"),
  // ML & AI
  PyTorch: si(siPytorch),
  "scikit-learn": bold(si(siScikitlearn)),
  NumPy: si(siNumpy),
  pandas: si(siPandas),
  LangChain: si(siLangchain),
  "RAG & LLM APIs": generic(<BrainCircuit />),
  "Vector DBs": generic(<Boxes />),
  // Web & mobile
  React: si(siReact),
  "Node.js": si(siNodedotjs),
  MongoDB: si(siMongodb),
  Kotlin: si(siKotlin),
  Android: si(siAndroid),
  Firebase: si(siFirebase),
  // Practices & tools
  Git: si(siGit),
  "CI/CD": si(siGithubactions),
  // Power BI's mark (three ascending rounded bars) is in neither library, so it is drawn here.
  "Power BI": {
    color: "#F2C811",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="12" width="5" height="10" rx="1.5" />
        <rect x="9.5" y="7" width="5" height="15" rx="1.5" />
        <rect x="16" y="2" width="5" height="20" rx="1.5" />
      </svg>
    ),
  },
  "System design": generic(<Network />),
  "OOP & DSA": generic(<Binary />),
  // Contact
  GitHub: si(siGithub),
  LinkedIn: dev(linkedinSvg, "#0A66C2"), // LinkedIn blue
  Email: si(siGmail),
};
