import { useEffect, useState } from "react";
 type Instrument = "guitar" | "drums" | null;
export default function useSequencer(
  size: number,
  grid: Instrument[][],
  instrument: Instrument,
) {
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playSound = (instrument: "guitar" | "drums") => {
    const audio = new Audio(`/sounds/${instrument}.wav`);
    audio.currentTime = 0;
    audio.play();
  };
  const playColumn = (col: number) => {
    grid.forEach((row) => {
      const cell = row[col];
      if (cell) {
        playSound(cell);
      }
    });
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCol((prev) => {
        const next = (prev + 1) % size;
        playColumn(next);
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isPlaying, size, grid, instrument]);

  return {
    currentCol,
    isPlaying,
    setIsPlaying,
  };
}