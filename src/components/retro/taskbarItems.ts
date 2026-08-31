export type TaskbarWindowId =
  | "projects"
  | "experience"
  | "journey"
  | "about"
  | "beforeCode"
  | "contact"
  | "projectPreview";

export type TaskbarIconConfig = {
  fallbackIcon: string;
  icon?: string;
  pixelArt?: boolean;
};

export type TaskbarItem = TaskbarIconConfig & {
  id: TaskbarWindowId;
  label: string;
};

export const taskbarItemById = {
  projects: {
    id: "projects",
    label: "Projects",
    fallbackIcon: "▤",
    icon: "/assets/icons/taskbar/taskbar-projects.png",
    pixelArt: true,
  },
  experience: {
    id: "experience",
    label: "Experience",
    fallbackIcon: "▧",
    icon: "/assets/icons/taskbar/taskbar-experience.png",
    pixelArt: true,
  },
  journey: {
    id: "journey",
    label: "Journey",
    fallbackIcon: "▥",
    icon: "/assets/icons/taskbar/taskbar-journey.png",
    pixelArt: true,
  },
  about: {
    id: "about",
    label: "About",
    fallbackIcon: "▱",
    icon: "/assets/icons/taskbar/taskbar-about.png",
    pixelArt: true,
  },
  beforeCode: {
    id: "beforeCode",
    label: "Before Code",
    fallbackIcon: "▣",
    icon: "/assets/icons/taskbar/taskbar-before-code.png",
    pixelArt: true,
  },
  contact: {
    id: "contact",
    label: "Contact",
    fallbackIcon: "✉",
    icon: "/assets/icons/taskbar/taskbar-contact.png",
    pixelArt: true,
  },
  projectPreview: {
    id: "projectPreview",
    label: "Project Preview",
    fallbackIcon: "▦",
  },
} satisfies Record<TaskbarWindowId, TaskbarItem>;

export const taskbarWindowItems = [
  taskbarItemById.projects,
  taskbarItemById.experience,
  taskbarItemById.journey,
  taskbarItemById.about,
  taskbarItemById.beforeCode,
  taskbarItemById.contact,
];

export const projectPreviewTaskbarItem = taskbarItemById.projectPreview;

export const resumeTaskbarItem = {
  label: "Resume",
  fallbackIcon: "▧",
};

export const startTaskbarItem = {
  label: "Start",
  fallbackIcon: "▦",
  icon: "/assets/icons/taskbar/taskbar-start.png",
};
