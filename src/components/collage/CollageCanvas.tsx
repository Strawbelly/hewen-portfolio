"use client";

import Link from "next/link";
import { useState } from "react";
import { CollageObject } from "@/components/collage/CollageObject";
import { ScrollZone } from "@/components/collage/ScrollZone";
import { RabbitAvatar } from "@/components/rabbit/RabbitAvatar";
import { DesktopIcon } from "@/components/retro/DesktopIcon";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { SystemDialog } from "@/components/retro/SystemDialog";
import { Taskbar } from "@/components/retro/Taskbar";
import { aboutContent } from "@/content/about";
import { experienceEntries } from "@/content/experience";
import { journeyEntries } from "@/content/journey";
import { projects } from "@/content/projects";
import { bringToFront } from "@/lib/windows/layers";

const windowIds = ["intro", "projects", "experience", "journey", "before-code", "about"];

export function CollageCanvas() {
  const [layers, setLayers] = useState(windowIds);

  const zIndexFor = (id: string) => layers.indexOf(id) + 10;
  const focusWindow = (id: string) => setLayers((current) => bringToFront(current, id));

  return (
    <div id="top" className="world-canvas min-h-screen pb-28">
      <Taskbar />
      <ScrollZone id="identity" label="identity/">
        <CollageObject className="relative z-10 mx-auto max-w-3xl pt-8 text-center md:pt-16">
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-none text-cobalt">HEWEN</h1>
          <p className="mx-auto mt-5 max-w-xl font-mono text-2xl leading-none">
            little worlds, now built with code
          </p>
        </CollageObject>
        <RetroWindow
          id="intro"
          title="about_this_world.txt"
          className="left-[7%] top-[22%] w-72 rotate-[-2deg]"
          zIndex={zIndexFor("intro")}
          onFocus={focusWindow}
        >
          <p className="font-mono text-2xl leading-none">
            Same creator. Different medium.
          </p>
        </RetroWindow>
        <CollageObject className="absolute right-[12%] top-[28%] hidden rotate-6 md:block">
          <RabbitAvatar size="lg" />
        </CollageObject>
      </ScrollZone>

      <ScrollZone id="projects" label="things_i_built/">
        <RetroWindow
          id="projects"
          title="things_i_built"
          className="left-[10%] top-[18%] w-[min(30rem,82vw)] rotate-1"
          zIndex={zIndexFor("projects")}
          onFocus={focusWindow}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="focus-ring border-2 border-dashed border-cobalt bg-cobalt-soft p-4"
              >
                <p className="font-mono text-2xl leading-none text-cobalt">{project.fileName}</p>
                <p className="mt-3 text-sm">{project.summary}</p>
              </Link>
            ))}
          </div>
        </RetroWindow>
        <CollageObject className="absolute right-[14%] top-[12%] hidden md:block">
          <DesktopIcon label="project_02.jpg" type="image" />
        </CollageObject>
        <CollageObject className="absolute bottom-[18%] right-[25%] hidden -rotate-6 md:block">
          <div className="cd-disc">code</div>
        </CollageObject>
      </ScrollZone>

      <ScrollZone id="experience" label="engineering/">
        <RetroWindow
          id="experience"
          title="work_history.txt"
          className="right-[8%] top-[20%] w-[min(34rem,84vw)] rotate-[-1deg]"
          zIndex={zIndexFor("experience")}
          onFocus={focusWindow}
        >
          <div className="font-mono text-2xl leading-none">
            {experienceEntries.map((entry) => (
              <p key={entry.id}>{entry.fileName}: content pending</p>
            ))}
          </div>
        </RetroWindow>
        <CollageObject className="absolute left-[12%] top-[15%] hidden md:block">
          <SystemDialog message="architecture notes will live here" />
        </CollageObject>
      </ScrollZone>

      <ScrollZone id="journey" label="school/ + notes/">
        <RetroWindow
          id="journey"
          title="learning_journey"
          className="left-[8%] top-[16%] w-80 rotate-2"
          zIndex={zIndexFor("journey")}
          onFocus={focusWindow}
        >
          <div className="flex flex-wrap gap-5">
            {journeyEntries.map((entry) => (
              <DesktopIcon key={entry.id} label={entry.label} type="folder" />
            ))}
          </div>
        </RetroWindow>
        <CollageObject className="absolute right-[16%] top-[18%] hidden md:block">
          <div className="notepad-scrap">notes/</div>
        </CollageObject>
      </ScrollZone>

      <ScrollZone id="before-code" label="before_code/">
        <RetroWindow
          id="before-code"
          title="paper_and_tape.bmp"
          className="right-[11%] top-[18%] w-[min(28rem,84vw)] rotate-[-2deg]"
          zIndex={zIndexFor("before-code")}
          onFocus={focusWindow}
        >
          <p className="font-mono text-2xl leading-none">
            Placeholder for the creative history behind the portfolio.
          </p>
        </RetroWindow>
        <CollageObject className="absolute left-[14%] top-[30%] hidden md:block">
          <div className="washi-strip -rotate-6">scrapbook thinking</div>
        </CollageObject>
      </ScrollZone>

      <ScrollZone id="about" label="about/">
        <span id="resume" className="absolute top-0" aria-hidden="true" />
        <RetroWindow
          id="about"
          title={aboutContent.label}
          className="left-1/2 top-[16%] w-[min(34rem,86vw)] -translate-x-1/2 rotate-1"
          zIndex={zIndexFor("about")}
          onFocus={focusWindow}
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <DesktopIcon label={aboutContent.label} />
            <DesktopIcon label={aboutContent.resumeLabel} type="resume" />
            <DesktopIcon label={aboutContent.contactLabel} type="folder" />
          </div>
        </RetroWindow>
      </ScrollZone>
    </div>
  );
}
