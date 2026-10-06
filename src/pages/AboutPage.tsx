import { Introduction } from "@/components/sections/Introduction";
import { Vision } from "@/components/sections/Vision";
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
    </>
  );
}
