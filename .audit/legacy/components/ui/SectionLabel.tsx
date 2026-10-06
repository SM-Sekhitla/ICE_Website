interface SectionLabelProps {
  num: string;
  label: string;
  className?: string;
}

export function SectionLabel({
  num,
  label,
  className = "",
}: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-cyan-ice">
        {num}
      </span>
      <span className="h-px w-8 bg-cyan-ice/30" />
      <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-white-dim">
        {label}
      </span>
    </div>
  );
}
