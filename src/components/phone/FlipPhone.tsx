"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-white px-4 py-6 sm:px-8">
      <button
        type="button"
        onClick={onSkip}
        className="focus-ring absolute right-5 top-5 z-20 font-mono text-xl text-cobalt underline decoration-dotted underline-offset-4 sm:right-8"
      >
        skip intro →
      </button>
      <motion.div
        className="phone-device"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
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
      </motion.div>
    </section>
  );
}
