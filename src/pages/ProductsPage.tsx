import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { products } from "@/data/products";
import { CallToAction } from "@/components/sections/CallToAction";
import { motion, useReducedMotion } from "framer-motion";
import { BinaryRain } from "@/components/animations/BinaryRain";
export function ProductsPage() {
  const reduced = useReducedMotion();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  return (
    <>
      <header className="page-heading brand-section products-heading">
        <BinaryRain />
        <span className="mono">ICE / Our products</span>
        <h1>
          ENGINEERING.
          <br />
          IN ACTION.
        </h1>
        <p>Practical applications of software, analytics and automation.</p>
      </header>
      <section className="section product-directory" aria-label="Our products">
        <BinaryRain />
        {products.map((product, i) => (
          <motion.article
            className="product-entry"
            id={product.id}
            key={product.id}
            initial={reduced ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="mono">
                {String(i + 1).padStart(2, "0")} / ICE Product
              </span>
              <h2 className={product.image ? "sr-only" : undefined}>
                {product.title}
              </h2>
              {product.subtitle && <p>{product.subtitle}</p>}
              {product.image && (
                <img
                  className="product-logo"
                  src={product.image}
                  alt={`${product.title} logo`}
                  loading="lazy"
                />
              )}
            </div>
            <div>
              {product.description && <p>{product.description}</p>}
              {product.features.length > 0 && (
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              <Link
                className="text-link"
                to={`/contact-us?product=${encodeURIComponent(product.title)}`}
              >
                Request demo <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
      <CallToAction />
    </>
  );
}
