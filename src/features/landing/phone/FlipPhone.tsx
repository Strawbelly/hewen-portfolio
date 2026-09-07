"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CollageItem, type CollageHover } from "@/features/landing/components/CollageItem";
import { HelloWorldReveal } from "@/features/landing/components/HelloWorldReveal";
import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  desktopLayout,
  desktopMotion
} from "@/features/landing/desktopLayout";
import {
  backspace,
  commitPending,
  COMMIT_DELAY,
  isKeypadDigit,
  KeypadDigit,
  MultiTapState,
  pressDigit,
  previewText
} from "@/lib/phone/multitap";
import { PhoneKeypad } from "@/features/landing/phone/PhoneKeypad";
import { PhoneScreen } from "@/features/landing/phone/PhoneScreen";

type FlipPhoneProps = {
  onConnected: () => void;
  onSkip: () => void;
};

const initialState: MultiTapState = {
  committed: "",
  pendingKey: null,
  pendingIndex: 0
};

const DESKTOP_BREAKPOINT = 768;

const getViewportLayout = () => {
  if (typeof window === "undefined") {
    return { isDesktop: true, supportsHover: false, scale: 1 };
  }

  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  return {
    isDesktop,
    supportsHover: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    scale: Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT)
  };
};

const landingStickers = [
  {
    layoutKey: "errorStack",
    src: "/assets/landing/error-stack.png",
    className: "landing-error-stack",
    width: 1536,
    height: 1024
  },
  {
    layoutKey: "calendar",
    src: "/assets/landing/calendar.png",
    className: "landing-calendar",
    width: 124,
    height: 102,
    hover: { scale: 1.06, y: -5, rotate: 3, duration: 0.25 }
  },
  {
    layoutKey: "newJess",
    src: "/assets/landing/new-jess.png",
    className: "landing-new-jess",
    width: 1679,
    height: 937,
    hover: { scale: 1.03, y: -3, rotate: 0.75, duration: 0.3 }
  },
  {
    layoutKey: "cursor",
    src: "/assets/landing/cursor.png",
    className: "landing-cursor",
    width: 185,
    height: 109
  },
  {
    layoutKey: "loading",
    src: "/assets/landing/loading-window.jpg",
    className: "landing-loading",
    width: 590,
    height: 370
  },
  {
    layoutKey: "helloWorld",
    src: "/assets/landing/hello-world.png",
    className: "landing-hello-world",
    width: 1214,
    height: 1295
  },
  {
    layoutKey: "cd",
    src: "/assets/landing/cd-case.png",
    className: "landing-cd",
    width: 1536,
    height: 1024,
    hover: { scale: 1.025, rotate: 4, duration: 0.35 }
  },
  {
    layoutKey: "music",
    src: "/assets/landing/music-file.png",
    className: "landing-music",
    width: 205,
    height: 257,
    hover: { scale: 1.08, y: -4, rotate: -3, duration: 0.22 }
  },
  {
    layoutKey: "camera",
    src: "/assets/landing/camera.png",
    className: "landing-camera",
    width: 1536,
    height: 1024,
    hover: { scale: 1.025, y: -4, rotate: 1, duration: 0.3 }
  },
  {
    layoutKey: "folder",
    src: "/assets/landing/folder.png",
    className: "landing-folder",
    width: 209,
    height: 182,
    hover: { scale: 1.06, y: -8, rotate: 2, duration: 0.25 }
  }
] as const;

export function FlipPhone({ onConnected, onSkip }: FlipPhoneProps) {
  const [tapState, setTapState] = useState<MultiTapState>(initialState);
  const [status, setStatus] = useState<"typing" | "connecting" | "connected">("typing");
  const [viewportLayout, setViewportLayout] = useState(getViewportLayout);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const text = previewText(tapState).slice(0, 12);
  const canConnect = text === "HEWEN";

  const clearCommitTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const scheduleCommit = () => {
    clearCommitTimer();
    timer.current = setTimeout(() => {
      setTapState((current) => commitPending(current));
    }, COMMIT_DELAY);
  };

  const handleDigit = (digit: KeypadDigit) => {
    if (status !== "typing") {
      return;
    }

    setTapState((current) => pressDigit(current, digit));
    scheduleCommit();
  };

  const handleBack = () => {
    clearCommitTimer();
    setTapState((current) => backspace(current));
  };

  const handleOk = () => {
    clearCommitTimer();
    const committed = commitPending(tapState);
    const nextText = previewText(committed);
    setTapState(committed);

    if (nextText !== "HEWEN" || status !== "typing") {
      return;
    }

    setStatus("connecting");
    window.setTimeout(() => setStatus("connected"), reduceMotion ? 150 : 900);
    window.setTimeout(onConnected, reduceMotion ? 350 : 1450);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeypadDigit(event.key)) {
        event.preventDefault();
        handleDigit(event.key);
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        handleBack();
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleOk();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearCommitTimer();
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const handleResize = () => setViewportLayout(getViewportLayout());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const frameStyle = viewportLayout.isDesktop
    ? {
        width: DESIGN_WIDTH * viewportLayout.scale,
        height: DESIGN_HEIGHT * viewportLayout.scale
      }
    : undefined;

  const canvasStyle = viewportLayout.isDesktop
    ? {
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transform: `scale(${viewportLayout.scale})`
      }
    : undefined;

  const getAmbientMotion = (layoutKey: keyof typeof desktopLayout) =>
    viewportLayout.isDesktop && !reduceMotion ? desktopMotion[layoutKey] : undefined;

  const getHoverMotion = (hover?: CollageHover) =>
    viewportLayout.isDesktop && viewportLayout.supportsHover && !reduceMotion ? hover : undefined;

  return (
    <section className="landing-collage-stage">
      <button
        type="button"
        onClick={onSkip}
        className="focus-ring landing-skip-link"
      >
        <span>skip intro</span>
        <span className="landing-skip-arrow" aria-hidden="true">
          →
        </span>
      </button>
      <motion.div
        className="landing-collage-frame"
        style={frameStyle}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="landing-collage-canvas" style={canvasStyle}>
          {landingStickers.map((sticker) => (
            <CollageItem
              key={sticker.src}
              item={desktopLayout[sticker.layoutKey]}
              motionConfig={getAmbientMotion(sticker.layoutKey)}
              hoverConfig={getHoverMotion("hover" in sticker ? sticker.hover : undefined)}
              className={sticker.className}
            >
              {sticker.layoutKey === "helloWorld" ? (
                <HelloWorldReveal
                  src={sticker.src}
                  width={sticker.width}
                  height={sticker.height}
                />
              ) : (
                <Image
                  src={sticker.src}
                  alt=""
                  aria-hidden="true"
                  width={sticker.width}
                  height={sticker.height}
                  className="landing-sticker"
                  priority
                  draggable={false}
                />
              )}
            </CollageItem>
          ))}
          <CollageItem
            item={desktopLayout.phone}
            motionConfig={getAmbientMotion("phone")}
            className="phone-placement"
          >
            <div className="phone-device">
              <div className="phone-top-shell">
                <div className="phone-camera" aria-hidden="true" />
                <PhoneScreen text={text} status={status} />
              </div>
              <div className="phone-hinge" aria-hidden="true">
                <span />
                <span />
              </div>
              <div className="phone-bottom-shell">
                <PhoneKeypad
                  onDigit={handleDigit}
                  onBack={handleBack}
                  onOk={handleOk}
                  canConnect={canConnect}
                  disabled={status !== "typing"}
                />
              </div>
            </div>
          </CollageItem>
        </div>
      </motion.div>
    </section>
  );
}
