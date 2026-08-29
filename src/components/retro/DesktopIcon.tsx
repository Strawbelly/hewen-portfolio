type DesktopIconProps = {
  label: string;
  type?: "folder" | "file" | "image" | "resume";
  href?: string;
};

const glyphs = {
  folder: "▣",
  file: "▤",
  image: "▧",
  resume: "▥"
};

export function DesktopIcon({ label, type = "file", href }: DesktopIconProps) {
  const content = (
    <>
      <span className="grid h-12 w-12 place-items-center border-2 border-ink bg-white text-3xl shadow-hard">
        {glyphs[type]}
      </span>
      <span className="mt-2 inline-block max-w-28 bg-cobalt px-1 font-mono text-lg leading-none text-white">
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="focus-ring inline-flex w-32 flex-col items-center text-center">
        {content}
      </a>
    );
  }

  return <div className="inline-flex w-32 flex-col items-center text-center">{content}</div>;
}
