"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { mainWorldLayout, type MainWorldWindowLayout } from "@/components/collage/mainWorldLayout";
import { AboutNotepad } from "@/components/collage/windows/AboutNotepad";
import { BeforeCodeImageViewer } from "@/components/collage/windows/BeforeCodeImageViewer";
import { ContactSystemDialog } from "@/components/collage/windows/ContactSystemDialog";
import { ExperienceEditor } from "@/components/collage/windows/ExperienceEditor";
import { JourneyLogWindow } from "@/components/collage/windows/JourneyLogWindow";
import { ProjectPreviewWindow } from "@/components/collage/windows/ProjectPreviewWindow";
import { ProjectsOpenDialog } from "@/components/collage/windows/ProjectsOpenDialog";
import { projectOptions, type ProjectOption } from "@/components/collage/windows/projectOptions";
import { Taskbar } from "@/components/retro/Taskbar";
import type { TaskbarWindowId } from "@/components/retro/taskbarItems";

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

const highestInitialZ = Math.max(...Object.values(initialWindowZ));
const desktopWindowIds: TaskbarWindowId[] = [
  "projects",
  "experience",
  "journey",
  "about",
  "beforeCode",
  "contact",
];
const initialActiveWindowId = desktopWindowIds.reduce((front, id) =>
  initialWindowZ[id] > initialWindowZ[front] ? id : front
);

const placement = (
  id: TaskbarWindowId,
  layout: MainWorldWindowLayout,
  zIndexes: Record<string, number>,
  bringToFront: (id: TaskbarWindowId) => void,
  activeWindowId: TaskbarWindowId
) => ({
  style: windowStyle(layout),
  zIndex: zIndexes[id] ?? layout.zIndex,
  interaction: {
    onActivate: () => bringToFront(id),
    windowId: id,
    isActive: activeWindowId === id,
  },
});

export function CollageCanvas() {
  const highestZ = useRef(highestInitialZ);
  const activeWindowRef = useRef<TaskbarWindowId>(initialActiveWindowId);
  const [zIndexes, setZIndexes] = useState(initialWindowZ);
  const [activeWindowId, setActiveWindowId] = useState<TaskbarWindowId>(initialActiveWindowId);
  const [selectedProjectId, setSelectedProjectId] = useState(projectOptions[0].id);
  const [openedProject, setOpenedProject] = useState<ProjectOption | null>(null);
  const selectedProject =
    projectOptions.find((project) => project.id === selectedProjectId) ?? projectOptions[0];

  const bringToFront = useCallback((id: TaskbarWindowId) => {
    if (activeWindowRef.current === id) return;
    highestZ.current += 1;
    const nextZ = highestZ.current;
    activeWindowRef.current = id;
    setActiveWindowId(id);
    setZIndexes((current) => ({ ...current, [id]: nextZ }));
  }, []);

  const openProject = () => {
    bringToFront("projectPreview");
    setOpenedProject(selectedProject);
  };

  const closeProject = () => {
    setOpenedProject(null);
    const nextActiveWindow = desktopWindowIds.reduce((front, id) =>
      (zIndexes[id] ?? 0) > (zIndexes[front] ?? 0) ? id : front
    );
    activeWindowRef.current = nextActiveWindow;
    setActiveWindowId(nextActiveWindow);
  };

  return (
    <div id="top" className="world-canvas main-world-desktop">
      <main className="main-world-pile" aria-label="Hewen's editorial desktop collage">
        <BeforeCodeImageViewer
          id="before-code"
          {...placement("beforeCode", mainWorldLayout.beforeCode, zIndexes, bringToFront, activeWindowId)}
        />
        <JourneyLogWindow
          id="journey"
          {...placement("journey", mainWorldLayout.journey, zIndexes, bringToFront, activeWindowId)}
        />
        <ExperienceEditor
          id="experience"
          {...placement("experience", mainWorldLayout.experience, zIndexes, bringToFront, activeWindowId)}
        />
        <ProjectsOpenDialog
          id="projects"
          {...placement("projects", mainWorldLayout.projects, zIndexes, bringToFront, activeWindowId)}
          projects={projectOptions}
          selectedProject={selectedProject}
          onSelect={setSelectedProjectId}
          onOpen={openProject}
          onCancel={() => setOpenedProject(null)}
        />
        <AboutNotepad
          id="about"
          {...placement("about", mainWorldLayout.about, zIndexes, bringToFront, activeWindowId)}
        />
        <ContactSystemDialog
          id="contact"
          {...placement("contact", mainWorldLayout.contact, zIndexes, bringToFront, activeWindowId)}
        />

        {openedProject ? (
          <ProjectPreviewWindow
            id="project-preview"
            {...placement("projectPreview", mainWorldLayout.projectPreview, zIndexes, bringToFront, activeWindowId)}
            project={openedProject}
            onClose={closeProject}
          />
        ) : null}
      </main>
      <Taskbar
        activeWindowId={activeWindowId}
        onWindowActivate={bringToFront}
        projectPreviewLabel={openedProject?.title}
      />
    </div>
  );
}
