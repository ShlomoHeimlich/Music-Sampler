import { useState} from "react";
import "../style/MusicTable.css";
import useSequencer from "./useSequencer";
export default function MusicTable() {
  type Instrument = "guitar" | "drums" | null;
  const [cols, setCols] = useState(10);
  const [rows] = useState(10);
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const [grid, setGrid] = useState<Instrument[][]>(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => null),
    ),
  );
  const { currentCol, isPlaying, setIsPlaying } = useSequencer(cols, grid);

  const addColumn = () => {
    setCols((prev) => prev + 1);
    setGrid((prev) => prev.map((row) => [...row, null]));
  };

  const removeColumn = () => {
    setCols((prev) =>  prev - 1);
    setGrid((prev) => prev.map((row) => row.slice(0, -1)));
  };

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
      <div className="buttons">
        <button onClick={addColumn}>add column</button>
        <button onClick={removeColumn}>remove column</button>
        <button onClick={() => setIsPlaying((p) => !p)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={() =>
            setInstrument((prev) => {
              const instruments: Instrument[] = ["guitar", "drums"];
              const index = instruments.indexOf(prev);
              return instruments[(index + 1) % instruments.length];
            })
          }
        >
          {instrument}
        </button>
      </div>
    </div>
  );
}