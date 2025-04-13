import { useRef } from "react";

const ColorCirclePicker = ({ color, onChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="inline-block relative">
      {/* El círculo visible */}
      <span
        onClick={handleClick}
        className="w-8 h-8 rounded-full border-2 border-violet-500 cursor-pointer inline-block"
        style={{ backgroundColor: color }}
        title={color}
      />

      {/* El input invisible */}
      <input
        type="color"
        ref={inputRef}
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 pointer-events-none"
        tabIndex={-1}
      />
    </div>
  );
};

export default ColorCirclePicker;
