"use client";

const destinations = [
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Journey", id: "journey" },
  { label: "About", id: "about" },
  { label: "Resume", id: "resume" }
];

export function Taskbar() {
  return (
    <nav
      aria-label="Portfolio navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-chrome px-2 py-2 shadow-[0_-5px_0_rgba(21,21,21,0.08)]"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto">
        <a
          href="#top"
          className="focus-ring shrink-0 border-2 border-ink bg-white px-3 py-1 font-mono text-xl leading-none shadow-hard"
        >
          start
        </a>
        {destinations.map((destination) => (
          <a
            key={destination.id}
            href={`#${destination.id}`}
            className="focus-ring shrink-0 border border-ink bg-chrome px-3 py-1 font-mono text-lg leading-none shadow-[2px_2px_0_#fff_inset,-2px_-2px_0_#808080_inset]"
          >
            {destination.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
