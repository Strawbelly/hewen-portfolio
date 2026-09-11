"use client";

import { useCallback, useEffect, useRef } from "react";

export const DTMF_FREQUENCIES = {
  "1": [697, 1209],
  "2": [697, 1336],
  "3": [697, 1477],
  "4": [770, 1209],
  "5": [770, 1336],
  "6": [770, 1477],
  "7": [852, 1209],
  "8": [852, 1336],
  "9": [852, 1477],
  "*": [941, 1209],
  "0": [941, 1336],
  "#": [941, 1477],
} as const;

export type DtmfKey = keyof typeof DTMF_FREQUENCIES;

type AudioContextConstructor = typeof AudioContext;
type WebkitAudioWindow = Window & { webkitAudioContext?: AudioContextConstructor };
type ActiveVoice = {
  context: AudioContext;
  gain: GainNode;
  oscillators: OscillatorNode[];
};

export function usePhoneSounds() {
  const contextRef = useRef<AudioContext | null>(null);
  const activeVoiceRef = useRef<ActiveVoice | null>(null);

  const getContext = useCallback(() => {
    if (contextRef.current) return contextRef.current;

    const AudioContextClass = window.AudioContext
      ?? (window as WebkitAudioWindow).webkitAudioContext;
    if (!AudioContextClass) return null;

    try {
      const context = new AudioContextClass();
      contextRef.current = context;
      return context;
    } catch {
      return null;
    }
  }, []);

  const fadeActiveVoice = useCallback(() => {
    const voice = activeVoiceRef.current;
    if (!voice) return;

    const now = voice.context.currentTime;
    try {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setTargetAtTime(0.0001, now, 0.003);
      voice.oscillators.forEach((oscillator) => oscillator.stop(now + 0.012));
    } catch {
      // A voice that has already ended needs no further cleanup.
    }
    activeVoiceRef.current = null;
  }, []);

  const playFrequencies = useCallback((frequencies: readonly number[], duration: number, volume: number) => {
    const context = getContext();
    if (!context) return;

    if (context.state === "suspended") {
      void context.resume().catch(() => undefined);
    }

    fadeActiveVoice();

    try {
      const now = context.currentTime;
      const stopAt = now + duration;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.006);
      gain.gain.setValueAtTime(volume, stopAt - 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopAt);
      gain.connect(context.destination);

      const oscillators = frequencies.map((frequency) => {
        const oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.connect(gain);
        oscillator.start(now);
        oscillator.stop(stopAt + 0.005);
        return oscillator;
      });

      const voice = { context, gain, oscillators };
      activeVoiceRef.current = voice;
      oscillators[0]?.addEventListener("ended", () => {
        if (activeVoiceRef.current === voice) activeVoiceRef.current = null;
        gain.disconnect();
      }, { once: true });
    } catch {
      // Unsupported or blocked audio must never interrupt keypad input.
    }
  }, [fadeActiveVoice, getContext]);

  const playDtmf = useCallback((key: DtmfKey) => {
    playFrequencies(DTMF_FREQUENCIES[key], 0.095, 0.035);
  }, [playFrequencies]);

  const playUiClick = useCallback(() => {
    playFrequencies([620], 0.055, 0.025);
  }, [playFrequencies]);

  useEffect(() => () => {
    fadeActiveVoice();
    const context = contextRef.current;
    if (context) void context.close().catch(() => undefined);
  }, [fadeActiveVoice]);

  return { playDtmf, playUiClick };
}
