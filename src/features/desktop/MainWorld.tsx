"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { PictureViewer } from "@/features/collages/PictureViewer";
import { DesktopDecoration } from "@/features/desktop/DesktopDecoration";
import { mainWorldDecorationsLayout } from "@/features/desktop/mainWorldDecorationsLayout";
import { mainWorldLayout, type MainWorldWindowLayout } from "@/features/desktop/mainWorldLayout";
import { Taskbar } from "@/features/desktop/Taskbar";
import type { DesktopWindowStatus, TaskbarWindowId } from "@/features/desktop/taskbarItems";
import { AboutNotepad } from "@/features/desktop/windows/AboutNotepad";
import { ContactSystemDialog } from "@/features/desktop/windows/ContactSystemDialog";
import { ExperienceEditor } from "@/features/desktop/windows/ExperienceEditor";
import { JourneyLogWindow } from "@/features/desktop/windows/JourneyLogWindow";
import { ProjectsOpenDialog } from "@/features/desktop/windows/ProjectsOpenDialog";
import { projectOptions, type ProjectOption } from "@/features/projects/projectData";

type WindowStyle = CSSProperties & {
  "--world-x": number;
  "--world-y": number;
  "--world-width": number;
  "--world-height": number;
  "--world-rotation": string;
};

const windowStyle = (layout: MainWorldWindowLayout): WindowStyle => ({
  "--world-x": layout.x,
  "--world-y": layout.y,
  "--world-width": layout.width,
  "--world-height": layout.height,
  "--world-rotation": `${layout.rotation}deg`
});

const initialWindowZ = Object.fromEntries(
  Object.entries(mainWorldLayout).map(([id, layout]) => [id, layout.zIndex])
) as Record<string, number>;

const desktopWindowIds: TaskbarWindowId[] = [
  "projects",
  "experience",
  "journey",
  "about",
  "contact",
];
const initialActiveWindowId = desktopWindowIds.reduce((front, id) =>
  initialWindowZ[id] > initialWindowZ[front] ? id : front
);

type DesktopWindowState = {
  status: DesktopWindowStatus;
  zIndex: number;
};

type DesktopWindowStates = Record<TaskbarWindowId, DesktopWindowState>;

const allWindowIds: TaskbarWindowId[] = [...desktopWindowIds, "collages", "projectPreview"];
const foregroundDecorationZIndex = 100;
const initialWindowStates = Object.fromEntries(
  allWindowIds.map((id) => [
    id,
    {
      status: id === "projectPreview" || id === "collages" ? "closed" : "open",
      zIndex: initialWindowZ[id],
    },
  ])
) as DesktopWindowStates;

const findTopOpenWindow = (states: DesktopWindowStates): TaskbarWindowId | null => {
  const openWindows = allWindowIds.filter((id) => states[id].status === "open");
  return openWindows.reduce<TaskbarWindowId | null>((front, id) => {
    if (!front || states[id].zIndex > states[front].zIndex) return id;
    return front;
  }, null);
};

const placement = (
  id: TaskbarWindowId,
  layout: MainWorldWindowLayout,
  state: DesktopWindowState,
  focusWindow: (id: TaskbarWindowId) => void,
  minimizeWindow: (id: TaskbarWindowId) => void,
  closeWindow: (id: TaskbarWindowId) => void,
  activeWindowId: TaskbarWindowId | null
) => ({
  style: windowStyle(layout),
  zIndex: state.zIndex,
  interaction: {
    onActivate: () => focusWindow(id),
    onMinimize: () => minimizeWindow(id),
    onClose: () => closeWindow(id),
    windowId: id,
    isActive: activeWindowId === id,
    status: state.status,
  },
});

export function MainWorld() {
  const decorationBoundsRef = useRef<HTMLDivElement>(null);
  const [selectedDecorationId, setSelectedDecorationId] = useState<string | null>(null);
  const [desktopIconSelected, setDesktopIconSelected] = useState(false);
  const [resumeIconSelected, setResumeIconSelected] = useState(false);
  const activeWindowRef = useRef<TaskbarWindowId>(initialActiveWindowId);
  const windowStatesRef = useRef<DesktopWindowStates>(initialWindowStates);
  const [windowStates, setWindowStates] = useState<DesktopWindowStates>(initialWindowStates);
  const [activeWindowId, setActiveWindowId] = useState<TaskbarWindowId | null>(initialActiveWindowId);
  const [selectedProjectId, setSelectedProjectId] = useState(projectOptions[0].id);
  const selectedProject =
    projectOptions.find((project) => project.id === selectedProjectId) ?? projectOptions[0];

  const commitWindowStates = useCallback((nextStates: DesktopWindowStates) => {
    windowStatesRef.current = nextStates;
    setWindowStates(nextStates);
  }, []);

  const focusWindow = useCallback((id: TaskbarWindowId) => {
    const current = windowStatesRef.current;
    if (activeWindowRef.current === id && current[id].status === "open") return;

    const orderedWindowIds = [...allWindowIds].sort(
      (first, second) => current[first].zIndex - current[second].zIndex
    );
    const normalizedStates = { ...current };
    orderedWindowIds.forEach((windowId, index) => {
      normalizedStates[windowId] = {
        ...current[windowId],
        zIndex: index + 1,
      };
    });
    normalizedStates[id] = {
      ...normalizedStates[id],
      status: "open",
      zIndex: id === "collages" ? foregroundDecorationZIndex + 1 : allWindowIds.length + 1,
    };

    commitWindowStates(normalizedStates);
    activeWindowRef.current = id;
    setActiveWindowId(id);
  }, [commitWindowStates]);

  const changeWindowStatus = useCallback((id: TaskbarWindowId, status: DesktopWindowStatus) => {
    const current = windowStatesRef.current;
    const nextStates: DesktopWindowStates = {
      ...current,
      [id]: { ...current[id], status },
    };
    commitWindowStates(nextStates);

    if (activeWindowRef.current === id) {
      const nextActiveWindow = findTopOpenWindow(nextStates);
      activeWindowRef.current = nextActiveWindow ?? initialActiveWindowId;
      setActiveWindowId(nextActiveWindow);
    }
  }, [commitWindowStates]);

  const minimizeWindow = useCallback(
    (id: TaskbarWindowId) => changeWindowStatus(id, "minimized"),
    [changeWindowStatus]
  );

  const closeWindow = useCallback(
    (id: TaskbarWindowId) => changeWindowStatus(id, "closed"),
    [changeWindowStatus]
  );

  const handleTaskbarWindow = useCallback((id: TaskbarWindowId) => {
    const state = windowStatesRef.current[id];
    if (state.status === "open" && activeWindowRef.current === id) {
      minimizeWindow(id);
      return;
    }
    focusWindow(id);
  }, [focusWindow, minimizeWindow]);

  const openProject = (project: ProjectOption) => {
    window.location.assign(project.href);
  };

  const viewProjectGithub = () => {
    if (selectedProject.github) {
      window.open(selectedProject.github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      id="top"
      className="world-canvas main-world-desktop"
      onPointerDownCapture={(event) => {
        if (!(event.target as Element).closest(".main-world-decoration")) {
          setSelectedDecorationId(null);
        }
        if (!(event.target as Element).closest(".main-world-desktop-icon")) {
          setDesktopIconSelected(false);
          setResumeIconSelected(false);
        }
      }}
    >
      <main className="main-world-pile" aria-label="Hewen's editorial desktop collage">
        <button
          type="button"
          className={`main-world-desktop-icon ${desktopIconSelected ? "is-selected" : ""}`}
          aria-label="Open Collages folder"
          onClick={() => {
            setDesktopIconSelected(true);
            setResumeIconSelected(false);
          }}
          onDoubleClick={() => focusWindow("collages")}
          onKeyDown={(event) => {
            if (event.key === "Enter") focusWindow("collages");
          }}
        >
          <Image
            src="/assets/icons/dekstop/desktop-paint.png"
            alt=""
            width={1536}
            height={1024}
            priority
          />
          <span>Collages</span>
        </button>
        <a
          className={`main-world-desktop-icon main-world-resume-icon ${resumeIconSelected ? "is-selected" : ""}`}
          href="/resume/Hewen_Shen_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Preview Hewen Shen resume in a new tab"
          onClick={(event) => {
            event.preventDefault();
            setResumeIconSelected(true);
            setDesktopIconSelected(false);
          }}
          onDoubleClick={() => {
            window.open(
              "/resume/Hewen_Shen_Resume.pdf",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              window.open(
                "/resume/Hewen_Shen_Resume.pdf",
                "_blank",
                "noopener,noreferrer"
              );
            }
          }}
        >
          <Image
            src="/assets/icons/dekstop/desktop-resume.png"
            alt=""
            width={1254}
            height={1254}
            priority
          />
          <span>Hewen_Shen_Resume.pdf</span>
        </a>
        <div ref={decorationBoundsRef} className="main-world-decorations">
          {mainWorldDecorationsLayout.map((decoration) => (
            <DesktopDecoration
              key={decoration.id}
              layout={decoration}
              constraintsRef={decorationBoundsRef}
              isSelected={selectedDecorationId === decoration.id}
              onSelect={setSelectedDecorationId}
            />
          ))}
        </div>

        <JourneyLogWindow
          id="journey"
          {...placement("journey", mainWorldLayout.journey, windowStates.journey, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
        />
        <ExperienceEditor
          id="experience"
          {...placement("experience", mainWorldLayout.experience, windowStates.experience, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
        />
        <ProjectsOpenDialog
          id="projects"
          {...placement("projects", mainWorldLayout.projects, windowStates.projects, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
          projects={projectOptions}
          selectedProject={selectedProject}
          onSelect={setSelectedProjectId}
          onOpen={openProject}
          onViewGithub={viewProjectGithub}
        />
        <AboutNotepad
          id="about"
          {...placement("about", mainWorldLayout.about, windowStates.about, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
        />
        <ContactSystemDialog
          id="contact"
          {...placement("contact", mainWorldLayout.contact, windowStates.contact, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
        />

        <PictureViewer
          id="collages"
          {...placement("collages", mainWorldLayout.collages, windowStates.collages, focusWindow, minimizeWindow, closeWindow, activeWindowId)}
        />

      </main>
      <Taskbar
        activeWindowId={activeWindowId}
        onWindowActivate={handleTaskbarWindow}
        collagesVisible={windowStates.collages.status !== "closed"}
      />
    </div>
  );
}
