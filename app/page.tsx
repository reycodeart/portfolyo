import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { AiEngineering } from "@/components/AiEngineering";
import { Workflow } from "@/components/Workflow";
import { Skills } from "@/components/Skills";
import { EvidenceExplorer } from "@/components/EvidenceExplorer";
import { Contact, Experience } from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <AiEngineering />
      <Workflow />
      <Skills />
      <EvidenceExplorer />
      <Experience />
      <Contact />
    </>
  );
}
