export type TaskbarWindowId =
  | "projects"
  | "experience"
  | "journey"
  | "about"
  | "beforeCode"
  | "contact"
  | "projectPreview";

export type TaskbarItem = {
  id: TaskbarWindowId;
  label: string;
  fallbackIcon: string;
  icon?: string;
  pixelArt?: boolean;
};

export const taskbarWindowItems: TaskbarItem[] = [
  {
    id: "projects",
    label: "Projects",
    fallbackIcon: "▤",
    icon: "/assets/icons/taskbar/taskbar-projects.png",
    pixelArt: true,
  },
  {
    id: "experience",
    label: "Experience",
    fallbackIcon: "▧",
    icon: "/assets/icons/taskbar/taskbar-experience.png",
    pixelArt: true,
  },
  {
    id: "journey",
    label: "Journey",
    fallbackIcon: "▥",
    icon: "/assets/icons/taskbar/taskbar-journey.png",
    pixelArt: true,
  },
  {
    id: "about",
    label: "About",
    fallbackIcon: "▱",
    icon: "/assets/icons/taskbar/taskbar-about.png",
    pixelArt: true,
  },
  {
    id: "beforeCode",
    label: "Before Code",
    fallbackIcon: "▣",
    icon: "/assets/icons/taskbar/taskbar-before-code.png",
    pixelArt: true,
  },
  {
    id: "contact",
    label: "Contact",
    fallbackIcon: "✉",
    icon: "/assets/icons/taskbar/taskbar-contact.png",
    pixelArt: true,
  },
];

export const projectPreviewTaskbarItem: Omit<TaskbarItem, "label"> = {
  id: "projectPreview",
  fallbackIcon: "▦",
};

export const resumeTaskbarItem = {
  label: "Resume",
  fallbackIcon: "▧",
};

export const startTaskbarItem = {
  label: "Start",
  fallbackIcon: "▦",
  icon: "/assets/icons/taskbar/taskbar-start.png",
};
