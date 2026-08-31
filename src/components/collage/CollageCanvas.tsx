"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { mainWorldLayout, type MainWorldWindowLayout } from "@/components/collage/mainWorldLayout";
import { AboutNotepad } from "@/components/collage/windows/AboutNotepad";
import { BeforeCodeImageViewer } from "@/components/collage/windows/BeforeCodeImageViewer";
import { ContactSystemDialog } from "@/components/collage/windows/ContactSystemDialog";
import { ContextMenuFragment } from "@/components/collage/windows/ContextMenuFragment";
import { ExperienceEditor } from "@/components/collage/windows/ExperienceEditor";
import { JourneyLogWindow } from "@/components/collage/windows/JourneyLogWindow";
import { ProjectPreviewWindow } from "@/components/collage/windows/ProjectPreviewWindow";
import { ProjectsOpenDialog } from "@/components/collage/windows/ProjectsOpenDialog";
import { projectOptions, type ProjectOption } from "@/components/collage/windows/projectOptions";
import { Taskbar } from "@/components/retro/Taskbar";

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

const placement = (layout: MainWorldWindowLayout) => ({
  style: windowStyle(layout),
  zIndex: layout.zIndex
});

export function CollageCanvas() {
  const [selectedProjectId, setSelectedProjectId] = useState(projectOptions[0].id);
  const [openedProject, setOpenedProject] = useState<ProjectOption | null>(null);
  const selectedProject =
    projectOptions.find((project) => project.id === selectedProjectId) ?? projectOptions[0];

  return (
    <div id="top" className="world-canvas main-world-desktop">
      <main className="main-world-pile" aria-label="Hewen's editorial desktop collage">
        <BeforeCodeImageViewer id="before-code" {...placement(mainWorldLayout.beforeCode)} />
        <JourneyLogWindow id="journey" {...placement(mainWorldLayout.journey)} />
        <ExperienceEditor id="experience" {...placement(mainWorldLayout.experience)} />
        <ProjectsOpenDialog
          id="projects"
          {...placement(mainWorldLayout.projects)}
          projects={projectOptions}
          selectedProject={selectedProject}
          onSelect={setSelectedProjectId}
          onOpen={() => setOpenedProject(selectedProject)}
          onCancel={() => setOpenedProject(null)}
        />
        <ContextMenuFragment {...placement(mainWorldLayout.contextMenu)} />
        <AboutNotepad id="about" {...placement(mainWorldLayout.about)} />
        <ContactSystemDialog id="contact" {...placement(mainWorldLayout.contact)} />

        {openedProject ? (
          <ProjectPreviewWindow
            id="project-preview"
            {...placement(mainWorldLayout.projectPreview)}
            project={openedProject}
            onClose={() => setOpenedProject(null)}
          />
        ) : null}
      </main>
      <Taskbar />
    </div>
  );
}
