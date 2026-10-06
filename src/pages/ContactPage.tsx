import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { company } from "@/data/company";
export function ContactPage() {
  const [params] = useSearchParams();
  const enquiry = params.get("product")
    ? "Demo request: " + params.get("product")
    : params.get("service")
      ? "Service enquiry: " + params.get("service")
      : "";
  const [prepared, setPrepared] = useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body =
      "Name: " +
      data.get("name") +
      "\nEmail: " +
      data.get("email") +
      "\nPhone: " +
      (data.get("phone") || "Not provided") +
      "\n\n" +
      data.get("message");
    window.location.href =
      "mailto:" +
      company.emails[0] +
      "?subject=" +
      encodeURIComponent(String(data.get("subject") || "Website enquiry")) +
      "&body=" +
      encodeURIComponent(body);
    setPrepared(true);
  }
  return (
    <>
      <header className="page-heading brand-section">
        <span className="mono">ICE / Contact us</span>
        <h1>
          LET’S MAKE
          <br />A SOLUTION.
        </h1>
        <p>Get in touch. Tell us what you need.</p>
      </header>
      <section className="section contact-layout">
        <div className="contact-details">
          <h2>Get in touch.</h2>
          <span className="mono">Location</span>
          <p>
            {company.address[0]}
            <br />
            {company.address[1]}
          </p>
          <span className="mono">Email</span>
          <p>
            {company.emails.map((email) => (
              <a key={email} href={"mailto:" + email}>
                {email}
              </a>
            ))}
          </p>
          <span className="mono">Business hours</span>
          <p>{company.hours}</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name *
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
            />
          </label>
          <label htmlFor="email">
            Email *
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
            />
          </label>
          <label htmlFor="phone">
            Phone number
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </label>
          <label htmlFor="subject">
            Subject
            <input
              id="subject"
              name="subject"
              defaultValue={enquiry}
              maxLength={200}
            />
          </label>
          <label className="full-field" htmlFor="message">
            Message *
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              maxLength={5000}
            />
          </label>
          <p className="full-field form-note">
            This opens a draft in your email app. Review and send it there, or
            email {company.emails[0]} directly.
          </p>
          <button className="button button-red" type="submit">
            Prepare email <span aria-hidden="true">↗</span>
          </button>
          {prepared && (
            <p className="full-field form-note" role="status">
              Your email app was requested to open. Your message has not been
              sent by this website. If no draft appeared, email{" "}
              {company.emails[0]} directly.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
