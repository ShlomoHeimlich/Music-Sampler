import { useEffect, useState } from "react";

export default function useSequencer(size: number, grid: boolean[][]) {
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    const audio = new Audio("/sounds/kick.wav");
    audio.currentTime = 0;
    audio.play();
  };

  const playColumn = (col: number) => {
    grid.forEach((row) => {
      if (row[col]) {
        playSound();
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
  }, [isPlaying, size]);

  return {
    currentCol,
    isPlaying,
    setIsPlaying,
  };
}