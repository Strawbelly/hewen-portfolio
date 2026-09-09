import { PortfolioExperience } from "@/features/portfolio/PortfolioExperience";
import { getCollageImages } from "@/features/collages/collageData";

export default function Home() {
  return <PortfolioExperience collageImages={getCollageImages()} />;
}
