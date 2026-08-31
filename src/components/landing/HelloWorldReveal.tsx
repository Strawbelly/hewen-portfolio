import Image from "next/image";

type HelloWorldRevealProps = {
  src: string;
  width: number;
  height: number;
};

export function HelloWorldReveal({ src, width, height }: HelloWorldRevealProps) {
  return (
    <div
      className="landing-hello-world-reveal"
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="landing-sticker landing-hello-world-line landing-hello-world-top"
        priority
        draggable={false}
      />
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="landing-sticker landing-hello-world-line landing-hello-world-bottom"
        priority
        draggable={false}
      />
    </div>
  );
}
