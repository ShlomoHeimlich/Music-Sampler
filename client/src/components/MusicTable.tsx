import { useState } from "react";
import "./MusicTable.css";
import useSequencer from "./useSequencer";
export default function MusicTable() {
  const size = 10;
  type Instrument = "guitar" | "drums" | null;
  const [grid, setGrid] = useState<Instrument[][]>(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null),
    ),
  );
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const { currentCol, isPlaying, setIsPlaying } = useSequencer(
    size,
    grid,
    instrument,
  );

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          return instrument;
        }
        return cell;
      }),
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
              className={`cell 
  ${cell === "guitar" ? "guitar" : ""}
  ${cell === "drums" ? "drums" : ""}
  ${currentCol === j ? "playing" : ""}
`}
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
            const instruments: Instrument[] = ["guitar", "drums"];
            if (prev === null) {
              return instruments[0];
            }
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
