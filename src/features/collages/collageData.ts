import "server-only";

import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { CollageImage } from "@/features/collages/collageTypes";

const COLLAGE_DIRECTORY = join(process.cwd(), "public", "assets", "collages");
const IMAGE_EXTENSION = /\.(?:avif|gif|jpe?g|png|webp)$/i;

export function getCollageImages(): CollageImage[] {
  return readdirSync(COLLAGE_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXTENSION.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      src: `/assets/collages/${entry.name}`,
    }))
    .sort((first, second) =>
      first.name.localeCompare(second.name, undefined, { numeric: true, sensitivity: "base" })
    );
}
