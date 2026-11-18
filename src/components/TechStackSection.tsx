import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { skills } from "@/data/profile";
import BrandIcon from "./BrandIcon";

const TechStackSection = () => (
  <TooltipProvider delayDuration={150}>
    <div className="space-y-10">
      {skills.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-green-400 mb-4">
            <span className="text-green-700">&gt;&gt; </span>
            {cat.title}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
            {cat.items.map((s) => (
              <Tooltip key={s.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="brand-host border border-green-900 hover:border-status focus-visible:border-status active:border-status px-3 py-4 flex flex-col items-center gap-2 transition-colors duration-300 motion-reduce:transition-none"
                  >
                    <BrandIcon name={s.name} />
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
