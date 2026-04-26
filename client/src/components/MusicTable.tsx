import { useState } from "react";
import "./MusicTable.css";
import useSequencer from "./useSequencer";
export default function MusicTable() {
  const size = 10;
  const [grid, setGrid] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false),
    ),
  );
  const [instrument, setInstrument] = useState("guitar");
  const { currentCol, isPlaying, setIsPlaying } = useSequencer(
    size,
    grid,
    instrument,
  );


  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell)),
    );
    setGrid(newGrid);
  };

  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={j}
              onClick={() => toggleCell(i, j)}
              className={`cell ${cell ? "active" : ""} ${currentCol === j ? "playing" : ""}`}
            />
          ))}
        </div>
      ))}
      <button onClick={() => setIsPlaying((p) => !p)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        onClick={() =>
          setInstrument((prev) => {
            const instruments = ["guitar", "drums"];
            const index = instruments.indexOf(prev);
            return instruments[(index + 1) % instruments.length];
          })
        }
      >
        {instrument}
      </button>
    </div>
  );
}
