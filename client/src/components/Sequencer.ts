import { useEffect, useState } from "react";
import type { Instrument } from "../types/Instrument.ts";
const sounds: Record<"guitar" | "drums", HTMLAudioElement[]> = {
  guitar: Array.from(
    { length: 7 },
    (_, i) => new Audio(`http://localhost:3001/sounds/guitar/${i + 1}.wav`),
  ),
  drums: Array.from(
    { length: 7 },
    (_, i) => new Audio(`http://localhost:3001/sounds/drums/${i + 1}.wav`),
  ),
};

export default function Sequencer(
  cols: number,
  grid: Instrument[][],
  setGrid: React.Dispatch<React.SetStateAction<Instrument[][]>>,
) {
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const playSound = (instrument: "guitar" | "drums", noteIndex: number) => {
    const audio = sounds[instrument][noteIndex - 1];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };

  const playColumn = (col: number) => {
    let note = 0;
    grid.forEach((row) => {
      const cell = row[col];
      note++;
      if (cell) {
        playSound(cell, note);
      }
    });
  };

  const restart = () => {
    setIsPlaying(false);
    setCurrentCol(0);
    setGrid(
      Array.from({ length: grid.length }, () =>
        Array.from({ length: cols }, () => null),
      ),
    );
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCol((prev) => {
        const next = (prev + 1) % cols;
        playColumn(next);
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, cols, speed, grid]);

  return { currentCol, isPlaying, setIsPlaying, restart, setSpeed };
}