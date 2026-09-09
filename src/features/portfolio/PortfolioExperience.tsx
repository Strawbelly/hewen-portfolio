"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MainWorld } from "@/features/desktop/MainWorld";
import { FlipPhone } from "@/features/landing/phone/FlipPhone";
import type { CollageImage } from "@/features/collages/collageTypes";
import { WorldLoadingScreen } from "@/features/portfolio/WorldLoadingScreen";

const SESSION_KEY = "hewen-portal-connected";

export function PortfolioExperience({ collageImages }: { collageImages: CollageImage[] }) {
  const [stage, setStage] = useState<"portal" | "loading" | "world">("portal");
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setStage(sessionStorage.getItem(SESSION_KEY) === "true" ? "world" : "portal");
    setReady(true);
  }, []);

  const enterWorld = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setStage("world");
  }, []);

  const beginLoading = useCallback(() => setStage("loading"), []);

  if (!ready) {
    return <main className="min-h-screen bg-paper" />;
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <AnimatePresence mode="wait">
        {stage === "portal" ? (
          <motion.section
            key="portal"
            initial={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.04, filter: "contrast(150%)" }
            }
            transition={{ duration: reduceMotion ? 0.15 : 0.55 }}
          >
            <FlipPhone onConnected={beginLoading} onSkip={beginLoading} />
          </motion.section>
        ) : stage === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.16 }}
          >
            <WorldLoadingScreen onComplete={enterWorld} />
          </motion.div>
        ) : (
          <motion.section
            key="world"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.55 }}
          >
            <MainWorld collageImages={collageImages} />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
