import { ReactNode } from "react";

type ScrollZoneProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function ScrollZone({ id, label, children, className = "" }: ScrollZoneProps) {
  return (
    <section id={id} className={`scroll-zone relative mx-auto min-h-[92vh] w-full max-w-6xl px-5 py-24 sm:px-8 ${className}`}>
      <p className="zone-label font-mono text-xl text-cobalt">{label}</p>
      {children}
    </section>
  );
}
