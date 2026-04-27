import { useEffect, useRef, useState } from "react";
type Instrument = "guitar" | "drums" | null;

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

export default function useSequencer(
  cols: number,
  grid: Instrument[][],
  setGrid: React.Dispatch<React.SetStateAction<Instrument[][]>>,
) {
  const [currentCol, setCurrentCol] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gridRef = useRef(grid);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const playSound = (instrument: "guitar" | "drums", noteIndex: number) => {
    const audio = sounds[instrument][noteIndex - 1];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };

  const playColumn = (col: number) => {
    let note = 0;
    const grid = gridRef.current;
    grid.forEach((row) => {
      const cell = row[col];
      note++;
      if (cell) {
        playSound(cell, note);
      }
    });
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCol((prev) => {
        const next = (prev + 1) % cols;
        playColumn(next);
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isPlaying, cols]);

  const restart = () => {
    setIsPlaying(false);
    setCurrentCol(0);
    setGrid(
      Array.from({ length: grid.length }, () =>
        Array.from({ length: cols }, () => null),
      ),
    );
  };

  return { currentCol, isPlaying, setIsPlaying, restart };
}
