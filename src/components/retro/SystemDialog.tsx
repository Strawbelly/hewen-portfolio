type SystemDialogProps = {
  title?: string;
  message: string;
};

export function SystemDialog({ title = "System message", message }: SystemDialogProps) {
  return (
    <aside className="retro-panel w-full max-w-xs bg-chrome p-1 text-ink shadow-hard">
      <div className="flex items-center justify-between bg-cobalt px-2 py-1 font-mono text-lg leading-none text-white">
        <span>{title}</span>
        <span aria-hidden="true" className="grid h-5 w-5 place-items-center border border-white">
          ×
        </span>
      </div>
      <div className="px-5 py-6 text-center font-mono text-xl leading-tight">
        <p>{message}</p>
        <button className="focus-ring mt-5 border border-ink bg-chrome px-7 py-1 shadow-[2px_2px_0_#fff_inset,-2px_-2px_0_#808080_inset]">
          OK
        </button>
      </div>
    </aside>
  );
}
