"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RabbitAvatar } from "@/components/rabbit/RabbitAvatar";
import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

type TextSegment = { text: string; bold?: boolean };

const ABOUT_TYPEWRITER_SESSION_KEY = "hewen-about-typewriter-v2-complete";
const HEADLINE = "Hi, I'm Hewen.";
const OPENING: TextSegment[] = [{ text: "My first encounter with code was... kind of accidental." }];
const STORY: TextSegment[][] = [
  [{ text: "Back in elementary school, my parents somehow put me in a " }, { text: "computer specialty class", bold: true }, { text: " instead of something more expected like calligraphy or violin. I still don't know why." }],
  [{ text: "By 2007, I had my own laptop. One semester, our teacher showed us a two-player fighting game built with code — health bars, attacks, the whole thing. None of us really understood the mysterious code on the screen. The final exam? Reproduce it from memory and get a perfect score." }],
  [{ text: "Somehow, I did. :)" }],
  [{ text: "That was the first code I ever wrote. I definitely didn't expect that, more than a decade later, I'd find my way back to it as a software engineer." }],
  [{ text: "I started out in backend, building mostly with " }, { text: "Java", bold: true }, { text: ". Then a frontend internship took me from " }, { text: "Figma → React", bold: true }, { text: ", designing and building an interface from scratch. Somewhere along the way, I realized I don't really want to be defined by one side of the stack. I just like learning new technologies, figuring out how things work, and turning ideas into something real." }],
  [{ text: "Now, with AI changing the way we build, I'm exploring " }, { text: "full-stack + AI", bold: true }, { text: "." }],
  [{ text: "This website is part of that experiment. I shaped the design through conversations with " }, { text: "ChatGPT", bold: true }, { text: ", built and iterated on it with " }, { text: "Codex", bold: true }, { text: ", and kept changing things as new ideas appeared. AI makes ideas evolve ridiculously fast — but as engineers, I still think we should understand what it's doing, why it works, and what we can make better." }],
  [{ text: "Anyway, that's enough about me." }],
  [{ text: "Have fun exploring my little corner of the internet. :)", bold: true }],
];

const paragraphs = [OPENING, ...STORY];
const paragraphText = (segments: TextSegment[]) => segments.map((segment) => segment.text).join("");
const paragraphStarts = paragraphs.reduce<number[]>((starts, paragraph, index) => {
  if (index === 0) return [HEADLINE.length + 2];
  return [...starts, starts[index - 1] + paragraphText(paragraphs[index - 1]).length + 2];
}, []);
const FULL_TEXT = `${HEADLINE}\n\n${paragraphs.map(paragraphText).join("\n\n")}`;
const FINAL_SENTENCE_START = paragraphStarts[paragraphStarts.length - 1];

function TypedParagraph({ index, segments, typedLength, typingComplete, className = "" }: {
  index: number;
  segments: TextSegment[];
  typedLength: number;
  typingComplete: boolean;
  className?: string;
}) {
  const start = paragraphStarts[index];
  const nextStart = paragraphStarts[index + 1] ?? FULL_TEXT.length + 1;
  const visibleLength = Math.max(0, typedLength - start);
  const showCursor = !typingComplete && typedLength >= start && typedLength < nextStart;
  let consumedCharacters = 0;

  return (
    <p className={className} aria-hidden="true">
      {segments.map((segment, segmentIndex) => {
        const segmentStart = consumedCharacters;
        consumedCharacters += segment.text.length;
        const visibleCharacters = Math.max(0, Math.min(segment.text.length, visibleLength - segmentStart));
        if (visibleCharacters === 0) return null;
        const content = segment.text.slice(0, visibleCharacters);
        return segment.bold ? <strong key={segmentIndex}>{content}</strong> : <span key={segmentIndex}>{content}</span>;
      })}
      {showCursor ? <span className="about-typewriter-cursor" aria-hidden="true" /> : null}
    </p>
  );
}

function StaticParagraph({ segments, className = "" }: { segments: TextSegment[]; className?: string }) {
  return (
    <p className={className}>
      {segments.map((segment, index) => segment.bold
        ? <strong key={index}>{segment.text}</strong>
        : <span key={index}>{segment.text}</span>)}
    </p>
  );
}

export function AboutNotepad({ className = "", style, ...props }: PositionedWindowProps) {
  const reduceMotion = useReducedMotion();
  const documentRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const [typedLength, setTypedLength] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [measuredWindowHeight, setMeasuredWindowHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateWindowHeight = () => {
      const measurement = measurementRef.current;
      if (!measurement) return;
      const availableDesktopHeight = window.innerHeight - 38;
      const maximumHeight = Math.floor(availableDesktopHeight * 0.58);
      const naturalWindowHeight = measurement.scrollHeight + 63;
      setMeasuredWindowHeight(Math.min(naturalWindowHeight, maximumHeight));
    };
    updateWindowHeight();
    window.addEventListener("resize", updateWindowHeight);
    return () => window.removeEventListener("resize", updateWindowHeight);
  }, []);

  useEffect(() => {
    if (reduceMotion || sessionStorage.getItem(ABOUT_TYPEWRITER_SESSION_KEY) === "true") {
      setTypedLength(FULL_TEXT.length);
      setTypingComplete(true);
      return;
    }
    if (typedLength >= FULL_TEXT.length) {
      const finishTimer = window.setTimeout(() => {
        sessionStorage.setItem(ABOUT_TYPEWRITER_SESSION_KEY, "true");
        setTypingComplete(true);
      }, 1200);
      return () => window.clearTimeout(finishTimer);
    }
    const delay = typedLength === HEADLINE.length ? 400 : typedLength === FINAL_SENTENCE_START ? 180 : 55;
    const timer = window.setTimeout(() => setTypedLength((length) => length + 1), delay);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, typedLength]);

  useEffect(() => {
    if (typingComplete || typedLength <= HEADLINE.length) return;
    const documentBody = documentRef.current;
    if (!documentBody) return;
    const frame = window.requestAnimationFrame(() => {
      const cursor = documentBody.querySelector<HTMLElement>(".about-typewriter-cursor");
      if (!cursor) return;
      const documentBounds = documentBody.getBoundingClientRect();
      const cursorBounds = cursor.getBoundingClientRect();
      if (cursorBounds.bottom > documentBounds.bottom - 18) {
        documentBody.scrollTo({
          top: documentBody.scrollTop + cursorBounds.bottom - documentBounds.bottom + 30,
          behavior: "smooth",
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [typedLength, typingComplete]);

  const visibleHeadline = HEADLINE.slice(0, typedLength);
  const cursorInHeadline = typedLength <= HEADLINE.length;

  return (
    <Win98Window
      {...props}
      className={`about-notepad-window ${className}`}
      style={{ ...style, ...(measuredWindowHeight ? { height: measuredWindowHeight } : {}) }}
      title="ABOUT_ME.TXT"
    >
      <div className="about-notepad-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp; Help</div>
        <div ref={documentRef} className="about-notepad-document" aria-label={FULL_TEXT}>
          <div className="about-notepad-opening">
            <RabbitAvatar size="compact" priority />
            <div className="about-introduction">
              <div className="about-introduction-heading">
                <strong aria-hidden="true">{visibleHeadline}</strong>
                {!typingComplete && cursorInHeadline ? <span className="about-typewriter-cursor" aria-hidden="true" /> : null}
              </div>
              <TypedParagraph index={0} segments={OPENING} typedLength={typedLength} typingComplete={typingComplete} className="about-introduction-opening" />
            </div>
          </div>

          <div className="about-story-body">
            {STORY.map((paragraph, index) => {
              const paragraphIndex = index + 1;
              if (typedLength < paragraphStarts[paragraphIndex]) return null;
              const isPersonalPause = index === 2;
              const isClosingLine = index === STORY.length - 1;
              return (
                <TypedParagraph
                  key={index}
                  index={paragraphIndex}
                  segments={paragraph}
                  typedLength={typedLength}
                  typingComplete={typingComplete}
                  className={isPersonalPause ? "about-story-pause" : isClosingLine ? "about-story-final" : ""}
                />
              );
            })}
          </div>
        </div>
        <div ref={measurementRef} className="about-notepad-measure" aria-hidden="true">
          <div className="about-notepad-opening">
            <span className="about-rabbit-measure" />
            <div className="about-introduction">
              <div className="about-introduction-heading"><strong>{HEADLINE}</strong></div>
              <StaticParagraph segments={OPENING} className="about-introduction-opening" />
            </div>
          </div>
          <div className="about-story-body">
            {STORY.map((paragraph, index) => (
              <StaticParagraph
                key={index}
                segments={paragraph}
                className={index === 2 ? "about-story-pause" : index === STORY.length - 1 ? "about-story-final" : ""}
              />
            ))}
          </div>
        </div>
        <span id="resume" className="sr-only">Resume</span>
      </div>
    </Win98Window>
  );
}
