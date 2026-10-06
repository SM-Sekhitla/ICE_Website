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
                {social.label} ↗
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
      <div className="footer-wordmark" aria-hidden="true">
        ICE.
      </div>
      <div className="footer-bottom mono">
        <span>Powered by: ICEPTY(LTD) © {new Date().getFullYear()}</span>
        <span>Industrial Computing Engineering / Established 2012</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
