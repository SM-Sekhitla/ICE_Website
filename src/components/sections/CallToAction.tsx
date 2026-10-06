import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Link } from "react-router-dom";
export function CallToAction({ number }: { number: number }) {
  return (
    <section className="section cta-section">
      <div className="section-label mono">
        {String(number).padStart(2, "0")} / Start a conversation <span>Industrial Computing Engineering</span>
      </div>
      <Link to="/contact-us" className="cta-link">
        <h2>
          LET’S MAKE
          <br />A SOLUTION.
        </h2>
        <span aria-hidden="true"><ArrowIcon /></span>
      </Link>
      <p>
        If you like what you read about what we can do for you, just reach out.
        We will sure help you.
      </p>
    </section>
  );
}
