import "devicon/devicon.min.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { skills } from "@/data/profile";

const TechStackSection = () => (
  <TooltipProvider delayDuration={150}>
    <div className="space-y-10">
      {skills.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-green-400 mb-4">
            <span className="text-green-700">&gt;&gt; </span>
            {cat.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cat.items.map((s) => (
              <Tooltip key={s.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="border border-green-900 hover:border-green-500 focus-visible:border-green-500 px-3 py-4 flex flex-col items-center gap-2 transition-colors"
                  >
                    {s.icon ? (
                      <i className={`${s.icon} text-3xl text-green-500`} aria-hidden="true" />
                    ) : (
                      <span className="font-display text-3xl leading-8 text-green-500" aria-hidden="true">
                        {s.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm text-white text-center">{s.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-black border border-green-500 text-green-400 font-mono">
                  <p className="text-xs">$ {s.command}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  </TooltipProvider>
);

export default TechStackSection;
