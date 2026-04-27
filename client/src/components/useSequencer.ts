import { useEffect, useState } from "react";
type Instrument = "guitar" | "drums" | null;
export default function useSequencer(cols: number, grid: Instrument[][]) {
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCol((prev) => {
        playColumn(prev);
        const next = (prev + 1) % cols;
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying, cols, grid]);

  const playSound = (instrument: "guitar" | "drums") => {
    const audio = new Audio(`http://localhost:3001/sounds/${instrument}.wav`);
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

  return {currentCol,
    isPlaying,
    setIsPlaying,
  };
}
