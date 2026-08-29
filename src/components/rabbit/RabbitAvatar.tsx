import Image from "next/image";

type RabbitAvatarProps = {
  variant?: "drawing" | "photo";
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizeMap = {
  sm: 64,
  md: 108,
  lg: 164
};

export function RabbitAvatar({
  variant = "drawing",
  size = "md",
  className = "",
  priority = false
}: RabbitAvatarProps) {
  const src = variant === "drawing" ? "/assets/rabbit-avatar.jpg" : "/assets/rabbit-photo.jpg";
  const alt = variant === "drawing" ? "Rabbit avatar sketch" : "Rabbit avatar reference";
  const dimension = sizeMap[size];

  return (
    <span
      className={`rabbit-frame inline-flex overflow-hidden border-2 border-ink bg-white ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
