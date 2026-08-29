"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CollageCanvas } from "@/components/collage/CollageCanvas";
import { FlipPhone } from "@/components/phone/FlipPhone";

const SESSION_KEY = "hewen-portal-connected";

export function PortfolioExperience() {
  const [connected, setConnected] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setConnected(sessionStorage.getItem(SESSION_KEY) === "true");
    setReady(true);
  }, []);

  const enterWorld = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setConnected(true);
  };

  if (!ready) {
    return <main className="min-h-screen bg-paper" />;
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <AnimatePresence mode="wait">
        {!connected ? (
          <motion.section
            key="portal"
            initial={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04, filter: "contrast(150%)" }}
            transition={{ duration: reduceMotion ? 0.15 : 0.55 }}
          >
            <FlipPhone onConnected={enterWorld} onSkip={enterWorld} />
          </motion.section>
        ) : (
          <motion.section
            key="world"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.55 }}
          >
            <CollageCanvas />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
