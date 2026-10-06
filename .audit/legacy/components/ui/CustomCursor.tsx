import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "hover" | "view" | "explore";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]") as HTMLElement | null;
      if (interactive) {
        const cursorType = interactive.dataset.cursor as CursorVariant;
        setVariant(cursorType || "hover");
      } else if (target.closest("a, button, input, textarea, select")) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const animate = () => {
      ringPos.current.x += (coords.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (coords.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [coords.x, coords.y]);

  const sizes = {
    default: { ring: 32, dot: 4 },
    hover: { ring: 56, dot: 4 },
    view: { ring: 96, dot: 0 },
    explore: { ring: 110, dot: 0 },
  };

  const size = sizes[variant];
  const label =
    variant === "view" ? "VIEW" : variant === "explore" ? "EXPLORE" : "";

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-cyan-ice transition-opacity duration-200"
        style={{
          width: size.dot,
          height: size.dot,
          opacity:
            visible && variant !== "view" && variant !== "explore" ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border transition-all duration-300"
        style={{
          width: size.ring,
          height: size.ring,
          borderColor: visible ? "rgba(91, 200, 229, 0.5)" : "transparent",
          backgroundColor:
            variant === "view" || variant === "explore"
              ? "rgba(91, 200, 229, 0.1)"
              : "transparent",
          opacity: visible ? 1 : 0,
        }}
      >
        {label && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-cyan-glow">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
