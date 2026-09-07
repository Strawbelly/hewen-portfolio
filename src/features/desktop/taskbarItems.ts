export type TaskbarWindowId =
  | "projects"
  | "experience"
  | "journey"
  | "about"
  | "contact"
  | "collages"
  | "projectPreview";

export type DesktopWindowStatus = "open" | "minimized" | "closed";

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
    label: "My Journey",
    fallbackIcon: "▥",
    icon: "/assets/icons/taskbar/taskbar-journey.png",
    pixelArt: true,
  },
  about: {
    id: "about",
    label: "About Me",
    fallbackIcon: "▱",
    icon: "/assets/icons/taskbar/taskbar-about.png",
    pixelArt: true,
  },
  contact: {
    id: "contact",
    label: "Contact",
    fallbackIcon: "✉",
    icon: "/assets/rabbit-avatar.jpg",
    pixelArt: false,
  },
  collages: {
    id: "collages",
    label: "Collages",
    fallbackIcon: "▧",
    icon: "/assets/icons/dekstop/desktop-paint.png",
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
  taskbarItemById.contact,
];

export const projectPreviewTaskbarItem = taskbarItemById.projectPreview;
export const collagesTaskbarItem = taskbarItemById.collages;

export const startTaskbarItem = {
  label: "Start",
  fallbackIcon: "▦",
  icon: "/assets/icons/taskbar/taskbar-start.png",
};
