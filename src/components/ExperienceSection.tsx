import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { experience } from "@/data/profile";
import Rich from "./Rich";

const ExperienceSection = () => (
  <Accordion type="multiple" defaultValue={experience.map((r) => r.id)} className="space-y-4">
    {experience.map((r) => (
      <AccordionItem key={r.id} value={r.id} className="border-b border-green-900">
        <AccordionTrigger className="hover:no-underline group py-3 text-left [&>svg]:text-green-500">
          <div className="flex flex-col gap-0.5">
            <span className="text-white group-hover:text-green-300">
              <span className="text-green-500">$ cd </span>
              {r.company}
            </span>
            <span className="text-sm text-gray-400">
              {r.title}, {r.place} <span className="text-green-700">// {r.date}</span>
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="pl-4 ml-1 border-l border-green-900 space-y-3 text-base text-white max-w-4xl">
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
