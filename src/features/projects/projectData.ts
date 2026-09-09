export type ProjectOption = {
  id: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  previewTitle: string;
  previewHighlights: Array<{ title: string; description: string }>;
  github?: string;
  icon: string;
  iconScale?: number;
};

export const projectOptions: ProjectOption[] = [
  {
    id: "online-learning-platform",
    title: "Online Learning Platform",
    type: "Distributed Systems",
    description: "Learning workflow, progress, and leaderboard services",
    technologies: ["React", "Java", "Spring Boot", "PostgreSQL"],
    previewTitle: "Education Platform",
    previewHighlights: [
      { title: "Progress Aggregation", description: "Combine lesson, quiz, and assignment activity into one stable learner progress model." },
      { title: "Role Boundaries", description: "Keep learner, instructor, and administrator operations explicit across service boundaries." },
      { title: "Leaderboard Consistency", description: "Update rankings efficiently without coupling score writes to every leaderboard query." },
    ],
    github: "https://github.com/Strawbelly/online-learning-platform",
    icon: "/assets/icons/projects/project-education.png",
    iconScale: 1,
  },
  {
    id: "movie-echoes",
    title: "Movie Echoes",
    type: "Full-Stack",
    description:
      "A full-stack MERN + Redux movie review platform where users can share reviews, discover content, and engage through likes and comments.",
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    previewTitle: "MOVIE ECHOES · FULL-STACK MOVIE REVIEW PLATFORM",
    previewHighlights: [
      {
        title: "Redux State Management",
        description:
          "Managed shared authentication and post state with Redux, using Redux Thunk to handle asynchronous API requests and update the UI with returned data.",
      },
      {
        title: "JWT Authentication",
        description:
          "Built the JWT authentication flow from frontend login and token storage to Axios token attachment and backend middleware for protected routes.",
      },
      {
        title: "Social & Discovery Features",
        description:
          "Built a social experience where users can discover movies, share reviews, and interact with others through likes and comments."
      },
    ],
    github: "https://github.com/Strawbelly/movie-echoes",
    icon: "/assets/icons/projects/project-movie.png",
    iconScale: 1.02,
  },
  {
    id: "scenesound",
    title: "SceneSound",
    type: "AI",
    description: "AI-powered music recommendation website that creates playlists from scene images and text descriptions, matching their mood and atmosphere.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Python",
      "Flask",
      "PyTorch",
      "Qualcomm LLM",
    ],
    previewTitle: "SCENESOUND · NEU × MICROSOFT × QUALCOMM AI HACKATHON",
    previewHighlights: [
    {
      title: "From Idea to Multimodal",
      description:
        "Proposed the original concept of recommending music from facial expressions, which the team iterated into a multimodal experience using uploaded scene images and text descriptions.",
    },
    {
      title: "Lyric Mood & Scene Classification",
      description:
        "Processed the song dataset, defined mood and scene labels, and used BART-MNLI zero-shot classification to analyze lyrics and tag each song with matching moods and scenes.",
    },
    {
      title: "Recommendation Pipeline",
      description:
        "The final system combined Places365 scene recognition, Qualcomm LLMs for text analysis, and a dual-layer matching strategy using a curated 1,000-song dataset with Spotify API fallback.",
    },
  ],
    github: "https://github.com/StarfishJ/SceneSound-hackathon",
    icon: "/assets/icons/projects/project-scenesound.png",
    iconScale: 1.1,
  },
  {
  id: "temple-fantasy",
  title: "Temple Fantasy",
  type: "Game Development",
  description:
    "A pixel-art fantasy game where players choose their characters, plan each move, and battle against a computer-controlled team in turn-based combat.",
  technologies: [
    "Python",
    "Pygame",
  ],
  previewTitle: "TEMPLE FANTASY · Python Course Project",
  previewHighlights: [
  {
    title: "Pixel-Art UI & Reusable Components",
    description:
      "Defined the game's pixel-art visual direction, collaborated with a designer on UI assets, and built a reusable Pygame button component for the interface.",
  },
  {
    title: "Unit Selection & Team Assignment",
    description:
      "Implemented the main menu and unit-selection interface, including the logic for players to choose three characters while automatically assigning the remaining characters to the computer team.",
  },
  {
    title: "Character Animation & Sound",
    description:
      "Built an animation system for six characters with idle, attack, special attack, hurt, and death states, integrated it into the main game logic, and added sound effects.",
  },
],
  github: "https://github.com/Strawbelly/pygame-Temple-Fantasy",
  icon: "/assets/icons/projects/project-game.png",
  iconScale: 1.55,
},
];
