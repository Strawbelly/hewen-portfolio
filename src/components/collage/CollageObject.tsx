import { ReactNode } from "react";

type CollageObjectProps = {
  children: ReactNode;
  className?: string;
};

export function CollageObject({ children, className = "" }: CollageObjectProps) {
  return <div className={`collage-object ${className}`}>{children}</div>;
}
