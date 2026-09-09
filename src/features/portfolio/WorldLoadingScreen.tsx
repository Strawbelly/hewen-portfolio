"use client";

import { useEffect, useState } from "react";

const PROGRESS_STEPS = [
  { delay: 0, value: 8 },
  { delay: 160, value: 21 },
  { delay: 340, value: 39 },
  { delay: 520, value: 58 },
  { delay: 720, value: 74 },
  { delay: 1120, value: 82 },
  { delay: 1300, value: 94 },
  { delay: 1420, value: 100 },
];

const SEGMENT_COUNT = 20;

export function WorldLoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimers = PROGRESS_STEPS.map(({ delay, value }) =>
      window.setTimeout(() => setProgress(value), delay)
    );
    const completionTimer = window.setTimeout(onComplete, 1600);

    return () => {
      progressTimers.forEach(window.clearTimeout);
      window.clearTimeout(completionTimer);
    };
  }, [onComplete]);

  const completedSegments = Math.floor((progress / 100) * SEGMENT_COUNT);

  return (
    <section className="world-loading-screen" aria-live="polite" aria-label="Loading Hewen's World">
      <div className="world-loading-content">
        <p>LOADING HEWEN&apos;S WORLD...</p>
        <div
          className="world-loading-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
            <span key={index} className={index < completedSegments ? "is-complete" : ""} />
          ))}
        </div>
        <span className="world-loading-percent">{progress}%</span>
      </div>
    </section>
  );
}
