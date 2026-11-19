import { Github, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/profile";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const linkCls = "inline-flex items-center gap-1 text-green-400 hover:text-status underline underline-offset-4";

const ProjectCard = ({ p }: { p: Project }) => (
  <article className="border border-green-900 hover:border-status transition-colors flex flex-col">
    <header className="border-b border-green-900 bg-gray-900 px-4 py-2 text-xs text-gray-400 flex justify-between gap-2">
      <span className="truncate">drwxr-xr-x {slug(p.name)}/</span>
      {p.date && <span className="shrink-0">{p.date}</span>}
    </header>
    <div className="p-4 flex flex-col flex-1">
      <h4 className="hl">{p.name}</h4>
      <p className="mt-2 text-sm text-white flex-1">{p.description}</p>
      <p className="mt-4 text-xs text-gray-400">{p.tech.join(" / ")}</p>
      {(p.code || p.demo) && (
        <div className="mt-3 flex gap-4 text-sm">
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <Github className="h-4 w-4" /> source
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className={linkCls}>
              <ExternalLink className="h-4 w-4" /> live
            </a>
          )}
        </div>
      )}
    </div>
  </article>
);

const Group = ({ title, kind }: { title: string; kind: Project["kind"] }) => (
  <div>
    <h3 className="accent subhead">
      <span className="opacity-60">./</span>
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects
        .filter((p) => p.kind === kind)
        .map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
    </div>
  </div>
);

const ProjectsSection = () => (
  <div className="space-y-10">
    <Group title="personal" kind="personal" />
    <Group title="at-work" kind="work" />
  </div>
);

export default ProjectsSection;
