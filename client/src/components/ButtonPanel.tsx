import "../style/ButtonPanel.css";
type ButtonPanelProps = {
  onPlayToggle: () => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
  onInstrumentChange: () => void;
  onRestart: () => void;
  instrument: string | null;
  isPlaying: boolean;
};
export default function ButtonPanel({
  onPlayToggle,
  onAddColumn,
  onRemoveColumn,
  onInstrumentChange,
  instrument,
  isPlaying,
  onRestart,
}: ButtonPanelProps) {
  return (
    <div className="buttons">
      <button onClick={onPlayToggle}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={onAddColumn}>Add column</button>
      <button onClick={onRemoveColumn}>Delete column</button>
      <button onClick={onInstrumentChange}>{instrument ?? "none"}</button>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
