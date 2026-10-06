import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useEffect } from "react";
import { motion } from "framer-motion";

export function StartupIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let cancelled = false;
    const images = ["/brand/ice-logo.png", "/brand/hero11.jpeg"].map((src) => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(() => undefined);
    });
    let holdTimer: number;
    const minimumHold = new Promise<void>((resolve) => {
      holdTimer = window.setTimeout(resolve, 1700);
    });
    const fallbackTimer = window.setTimeout(onComplete, 3500);
    Promise.all([...images, minimumHold]).then(() => {
      if (!cancelled) {
        window.clearTimeout(fallbackTimer);
        onComplete();
      }
    });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", escape);
    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", escape);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <motion.div
      className="startup-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <motion.img
        className="startup-logo"
        src="/brand/ice-logo.png"
        width="2331"
        height="444"
        alt="Industrial Computing Engineering"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.95, delay: 0.1, ease: "easeInOut" }}
      />
      <button className="startup-skip mono" onClick={onComplete}>
        Skip intro <ArrowIcon />
      </button>
    </motion.div>
  );
}
