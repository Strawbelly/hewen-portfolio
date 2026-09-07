"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { PositionedWindowProps } from "@/components/retro/Win98Window";
import { Win98Window } from "@/components/retro/Win98Window";

const logs = [
  {
    filename: "create.log",
    title: "01 — CREATING WITH PAPER",
    paragraphs: [
      "Before I built with code, I built with paper.",
      "I loved taking characters, flowers, and tiny objects from illustrated washi tapes and arranging them into little scenes — each one becoming a story of its own.",
      "You can still find some of them in the Collages folder on this desktop. :)",
    ],
  },
  {
    filename: "return.log",
    title: "02 — FINDING MY WAY BACK",
    paragraphs: [
      "More than a decade later, I found my way back to code at Northeastern.",
      "Python became my real introduction to programming. For our final project, my team built a human-vs-computer game from 0 → 1. I wanted it to feel like a little world of its own, so I proposed a pixel-art direction and asked my cousin, a designer, to help us create some of the UI.",
      "It was the first time I had taken an idea and turned it into a working experience with code.",
      "A different medium, but a familiar feeling.",
    ],
  },
  {
    filename: "systems.log",
    title: "03 — FROM PROGRAMS TO SYSTEMS",
    paragraphs: [
      "I started with monolithic applications, where most of the pieces lived together in one place. Then I moved into microservices — and suddenly, I had to think about how those pieces communicate and stay coordinated across services.",
      "Across two microservices projects, I worked with caching, message queues, and search infrastructure while running into new kinds of problems:",
      "> How do you prevent conflicts when multiple requests modify the same data?\n> How do you keep data consistent across services?\n> What do you do when a single table is no longer enough?",
      "Those questions led me to distributed locks, message queues, and database sharding — and taught me to think beyond making one program work, toward making an entire system work together.",
    ],
  },
  {
    filename: "crossing.log",
    title: "04 — CROSSING THE STACK",
    paragraphs: [
      "When I applied for my internship, I presented myself as someone who could work across the stack. The interview covered both frontend and backend, but the team needed more help on the frontend — and my backend background made the role an interesting fit.",
      "I had spent much more time on backend engineering, so I wasn't completely sure how quickly I could adapt.",
      "That uncertainty didn't last long. I went from Figma to React, turned requirements into working features, and worked closely with backend engineers to understand the APIs and workflows behind what I was building.",
      "It was the first time I realized that “full-stack” wasn't just something I could put on an application. I could actually grow across the stack when the work called for it.",
    ],
  },
  {
    filename: "next.log",
    title: "05 — STILL BUILDING...",
    paragraphs: [
      "My curiosity about AI became more concrete at a hackathon in 2025, when I proposed an AI-powered music recommendation app. What started with facial expressions evolved with my teammates into recommendations based on a user's mood and scene.",
      "Back then, AI mostly felt like something we called — an API or a model inside an application. Agents changed the way I think about that, and brought me back to the same idea: I'm now exploring a music agent that can understand context and build personalized playlists.",
      "I'm exploring that new way of building here, too. This portfolio grew through conversations and iterations with AI — turning ideas into what you're looking at now.",
      "Still building. Still learning. Still curious.",
      "Same creator. Different medium.",
      "_",
    ],
  },
];

export function JourneyLogWindow(props: PositionedWindowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabId = useId();
  const activeLog = logs[activeIndex];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % logs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index + logs.length - 1) % logs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = logs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <Win98Window {...props} title="MY_JOURNEY.EXE — Command Prompt">
      <div className="journey-log-app">
        <div
          className="journey-session-taskbar"
          role="toolbar"
          aria-label="Open Journey console sessions"
        >
          {logs.map((log, index) => (
            <button
              key={log.filename}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              id={`${tabId}-tab-${index}`}
              aria-controls={`${tabId}-output`}
              aria-pressed={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              className="journey-session-button"
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {String(index + 1).padStart(2, "0")}{" "}
              {log.filename.replace(".log", "").toUpperCase()}
            </button>
          ))}
        </div>
        <div
          key={activeLog.filename}
          className="journey-log-text"
          role="region"
          id={`${tabId}-output`}
          aria-labelledby={`${tabId}-tab-${activeIndex}`}
          tabIndex={0}
        >
          <div className="journey-log-document">
            <p className="journey-log-command">
              C:\HEWEN\HISTORY&gt; read {activeLog.filename}
            </p>
            <h2>{activeLog.title}</h2>
            {activeLog.paragraphs.map((paragraph, index) =>
              paragraph === "_" ? null : <p key={index}>{paragraph}</p>,
            )}
            <p className="journey-log-prompt">
              C:\HEWEN\HISTORY&gt;{" "}
              <span className="journey-log-cursor" aria-hidden="true">
                _
              </span>
            </p>
          </div>
        </div>
      </div>
    </Win98Window>
  );
}
