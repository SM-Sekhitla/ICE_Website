import { Capabilities } from "@/components/sections/Capabilities";
import { CallToAction } from "@/components/sections/CallToAction";
export function CapabilitiesPage() {
  return (
    <>
      <header className="page-heading">
        <span className="mono">ICE / Our services</span>
        <h1>
          ENGINEERED
          <br />
          <span className="red-text">AROUND YOU.</span>
        </h1>
        <p>
          Software, analytics and technology solutions for government and
          private sectors.
        </p>
      </header>
      <Capabilities full />
      <CallToAction number={2} />
    </>
  );
}
