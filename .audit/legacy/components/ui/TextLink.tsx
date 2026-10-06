import { motion } from "framer-motion";

interface TextLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "default" | "bordered";
  className?: string;
}

export function TextLink({
  children,
  to,
  href,
  variant = "default",
  className = "",
}: TextLinkProps) {
  const baseClass =
    "group relative inline-flex items-center font-mono text-xs uppercase tracking-widest transition-colors";
  const variantClass =
    variant === "bordered"
      ? "border border-cyan-ice/30 px-6 py-3 text-white-frost hover:border-cyan-ice/60 overflow-hidden"
      : "text-cyan-glow hover:text-white-frost";

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "default" && (
        <span className="ml-3 h-px w-8 bg-cyan-ice transition-all duration-300 group-hover:w-16" />
      )}
      {variant === "bordered" && (
        <span className="absolute inset-0 -translate-y-full bg-cyan-ice/10 transition-transform duration-300 group-hover:translate-y-0" />
      )}
    </>
  );

  if (to) {
    return (
      <a
        href={to}
        className={`${baseClass} ${variantClass} ${className}`}
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`${baseClass} ${variantClass} ${className}`}
      data-cursor="hover"
    >
      {content}
    </a>
  );
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function AnimatedButton({
  children,
  to,
  href,
  className = "",
  type = "button",
  onClick,
}: AnimatedButtonProps) {
  const inner = (
    <>
      <span className="absolute inset-0 bg-cyan-ice/5 transition-transform duration-500 group-hover:scale-105" />
      <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.3em]">
        {children}
      </span>
      <span className="absolute inset-0 border border-cyan-ice/0 transition-all duration-500 group-hover:inset-1 group-hover:border-cyan-ice/20" />
    </>
  );

  const classes = `group relative inline-flex items-center justify-center overflow-hidden border border-cyan-ice/30 px-10 py-5 font-display text-sm font-medium uppercase tracking-widest text-white-frost transition-colors hover:border-cyan-ice/60 ${className}`;

  if (type === "submit") {
    return (
      <button
        type="submit"
        onClick={onClick}
        data-cursor="hover"
        className={classes}
      >
        {inner}
      </button>
    );
  }

  const MotionLink = motion.a;
  return (
    <MotionLink
      href={to || href}
      data-cursor="hover"
      whileHover="hover"
      className={classes}
    >
      {inner}
    </MotionLink>
  );
}
