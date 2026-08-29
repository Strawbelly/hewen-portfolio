"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { PhoneKeypad } from "@/components/phone/PhoneKeypad";
import { PhoneScreen } from "@/components/phone/PhoneScreen";

type FlipPhoneProps = {
  onConnected: () => void;
  onSkip: () => void;
};

const initialState: MultiTapState = {
  committed: "",
  pendingKey: null,
  pendingIndex: 0
};

const landingStickers = [
  {
    src: "/assets/landing/error-stack.png",
    className: "landing-sticker landing-error-stack",
    width: 1536,
    height: 1024
  },
  {
    src: "/assets/landing/calendar.png",
    className: "landing-sticker landing-calendar",
    width: 124,
    height: 102
  },
  {
    src: "/assets/landing/new-jess.png",
    className: "landing-sticker landing-new-jess",
    width: 1679,
    height: 937
  },
  {
    src: "/assets/landing/cursor.png",
    className: "landing-sticker landing-cursor",
    width: 185,
    height: 109
  },
  {
    src: "/assets/landing/loading-window.jpg",
    className: "landing-sticker landing-loading",
    width: 590,
    height: 370
  },
  {
    src: "/assets/landing/cd-case.png",
    className: "landing-sticker landing-cd",
    width: 1536,
    height: 1024
  },
  {
    src: "/assets/landing/music-file.png",
    className: "landing-sticker landing-music",
    width: 205,
    height: 257
  },
  {
    src: "/assets/landing/camera.png",
    className: "landing-sticker landing-camera",
    width: 1536,
    height: 1024
  },
  {
    src: "/assets/landing/folder.png",
    className: "landing-sticker landing-folder",
    width: 209,
    height: 182
  }
];

export function FlipPhone({ onConnected, onSkip }: FlipPhoneProps) {
  const [tapState, setTapState] = useState<MultiTapState>(initialState);
  const [status, setStatus] = useState<"typing" | "connecting" | "connected">("typing");
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

  return (
    <section className="landing-collage-stage">
      <button
        type="button"
        onClick={onSkip}
        className="focus-ring landing-skip-link"
      >
        skip intro →
      </button>
      <motion.div
        className="landing-collage-canvas"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {landingStickers.map((sticker) => (
          <Image
            key={sticker.src}
            src={sticker.src}
            alt=""
            aria-hidden="true"
            width={sticker.width}
            height={sticker.height}
            className={sticker.className}
            priority
            draggable={false}
          />
        ))}
        <div className="phone-placement">
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
        </div>
      </motion.div>
    </section>
  );
}
