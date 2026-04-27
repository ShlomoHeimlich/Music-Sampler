import "../style/ButtonPanel.css";
type ButtonPanelProps = {
  onPlayToggle: () => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
  onInstrumentChange: () => void;
  onRestart: () => void;
  instrument: string | null;
  isPlaying: boolean;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
};
export default function ButtonPanel({
  onPlayToggle,
  onAddColumn,
  onRemoveColumn,
  onInstrumentChange,
  instrument,
  isPlaying,
  onRestart,
  setSpeed,
}: ButtonPanelProps) {
  return (
    <div className="buttons">
      <button onClick={onPlayToggle}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={onAddColumn}>Add column</button>
      <button onClick={onRemoveColumn}>Delete column</button>
      <button onClick={onInstrumentChange}>{instrument ?? "none"}</button>
      <button onClick={onRestart}>Restart</button>
      <button onClick={() => setSpeed((s) => Math.max(100, s - 100))}>
        Faster
      </button>

      <button onClick={() => setSpeed((s) => s + 100)}>Slower</button>
    </div>
  );
}
