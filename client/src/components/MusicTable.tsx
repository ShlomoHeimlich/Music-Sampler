import { useState } from "react";
import "../style/MusicTable.css";
import Sequencer from "./Sequencer.ts";
import ButtonPanel from "./ButtonPanel";
import type { Instrument } from "../types/Instrument.ts";
export default function MusicTable() {
  const [cols, setCols] = useState(10);
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const [grid, setGrid] = useState<Instrument[][]>(
    Array.from({ length: 7 }, () =>
      Array.from({ length: 10 }, () => null),
    ),
  );

  const { currentCol, isPlaying, setIsPlaying, restart, setSpeed } = Sequencer(cols, grid, setGrid);

  const changeInstrument = () => {
    setInstrument((prev) => {
      const instruments: Instrument[] = ["guitar", "drums"];
      const index = instruments.indexOf(prev);
      return instruments[(index + 1) % instruments.length];
    });
  };

  const addColumn = () => {
    setCols((prev) => prev + 1);
    setGrid((prev) => prev.map((row) => [...row, null]));
  };

  const removeColumn = () => {
    setCols((prev) => prev - 1);
    setGrid((prev) => prev.map((row) => row.slice(0, -1)));
  };

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          if (cell === instrument) {
            return null;
          }
          return instrument;
        }
        return cell;
      }),
    );
    setGrid(newGrid);
  };

  return (
    <div className="title">
      Songwriter
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
        <ButtonPanel
          onPlayToggle={() => setIsPlaying((p) => !p)}
          onAddColumn={addColumn}
          onRemoveColumn={removeColumn}
          onInstrumentChange={changeInstrument}
          instrument={instrument}
          isPlaying={isPlaying}
          onRestart={restart}
          setSpeed={setSpeed}
        />
      </div>
    </div>
  );
}