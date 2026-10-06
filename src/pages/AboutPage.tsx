import { Introduction } from "@/components/sections/Introduction";
import { Vision } from "@/components/sections/Vision";
import { IceFilter } from "@/components/sections/IceFilter";
import { People } from "@/components/sections/BrandStory";
import { CallToAction } from "@/components/sections/CallToAction";
export function AboutPage() {
  return (
    <>
      <header className="page-heading brand-section">
        <span className="mono">ICE / About us</span>
        <h1>
          WHO
          <br />
          ARE WE?
        </h1>
        <p>African-owned. Engineering-led. Data-driven.</p>
      </header>
      <Introduction full />
      <Vision />
      <IceFilter number="10" />
      <People />
      <CallToAction />
    </>
  );
}
