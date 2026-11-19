import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { experience } from "@/data/profile";
import Rich from "./Rich";

const ExperienceSection = () => (
  <Accordion type="multiple" defaultValue={experience.map((r) => r.id)} className="space-y-4">
    {experience.map((r) => (
      <AccordionItem key={r.id} value={r.id} className="border-b border-green-900">
        <AccordionTrigger className="hover:no-underline group py-3 text-left gap-4 [&>svg]:text-green-500">
          {/* company + role on the left, dates pushed right on desktop */}
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 w-full">
            <div className="flex flex-col gap-0.5">
              <span className="text-lg sm:text-xl text-white group-hover:text-status transition-colors">
                <span className="text-green-500">$ cd </span>
                {r.company}
              </span>
              <span className="text-base sm:text-lg text-green-300">
                {r.title}
                <span className="text-gray-400">, {r.place}</span>
              </span>
            </div>
            <span className="text-sm text-gray-400 md:text-right shrink-0">{r.date}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/* two columns on wide screens keep each bullet at a comfortable line length */}
          <ul className="pl-4 ml-1 border-l border-green-900 grid xl:grid-cols-2 gap-x-12 gap-y-3 text-base text-white">
            {r.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-green-500 shrink-0">▹</span>
                <span>
                  <Rich text={item} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 pl-5 text-sm text-gray-400">
            <span className="text-green-700">tags: </span>
            {r.tags.join(", ")}
          </p>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default ExperienceSection;
