import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { navigation } from "@/data/navigation";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link className="brand-logo" to="/">
            <img
              src="/brand/ice-logo.png"
              alt="Industrial Computing Engineering"
              width="2331"
              height="444"
            />
          </Link>
          <p>{company.footer}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <span className="mono">Explore ICE</span>
          {navigation.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-contact">
          <span className="mono">Find us / Pretoria</span>
          <address>
            {company.address[0]}
            <br />
            {company.address[1]}
          </address>
          {company.emails.map((email) => (
            <a key={email} href={"mailto:" + email}>
              {email}
            </a>
          ))}
          <p>{company.hours}</p>
          <div className="footer-socials">
            {company.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label} <ArrowIcon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-services">
        {[
          "Business Enterprise Architecture",
          "ICT Systems Integration Service",
          "Business Anomaly Detection",
          "Business Intelligence",
          "Data Science",
        ].map((service) => (
          <Link key={service} to="/our-services">
            {service}
          </Link>
        ))}
      </div>
      <div className="footer-signature" aria-hidden="true">
        <div className="footer-equations" aria-hidden="true">
          {[
            "θₜ₊₁ = θₜ − η∇L(θₜ)",
            "P(A|B) = P(B|A)P(A) / P(B)",
            "T(n) = 2T(n/2) + n",
            "ŷ = σ(Wx + b)",
            "H(X) = −Σ p(x) log₂ p(x)",
            "∇²f = Σ ∂²f / ∂xᵢ²",
            "L = (1/n) Σ(yᵢ − ŷᵢ)²",
            "f(x) = wᵀx + b",
            "O(n log n)",
            "Σ = E[(X − μ)(X − μ)ᵀ]",
            "Aw = λw",
            "∇f = (∂f/∂x₁, …, ∂f/∂xₙ)",
            "σ(z) = 1 / (1 + e⁻ᶻ)",
            "E[X] = Σ x p(x)",
            "Var(X) = E[X²] − E[X]²",
            "z = (x − μ) / σ",
            "A = UΣVᵀ",
            "‖x‖₂ = √(Σ xᵢ²)",
            "P(A ∩ B) = P(A|B)P(B)",
            "D(p ‖ q) = Σ pᵢ ln(pᵢ/qᵢ)",
            "hₜ = tanh(Whₜ₋₁ + Uxₜ + b)",
            "β̂ = (XᵀX)⁻¹Xᵀy",
            "F₁ = 2PR / (P + R)",
            "∫ p(x) dx = 1",
          ].map((equation) => (
            <span key={equation}>{equation}</span>
          ))}
        </div>
        <div className="footer-wordmark">ICE.</div>
      </div>
      <div className="footer-bottom mono">
        <span>Powered by: ICEPTY(LTD) © {new Date().getFullYear()}</span>
        <span>Industrial Computing Engineering / Established 2012</span>
        <a href="#main-content">Back to top <ArrowIcon direction="up" /></a>
      </div>
    </footer>
  );
}
