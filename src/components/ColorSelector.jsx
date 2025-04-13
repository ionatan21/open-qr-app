import ColorCirclePicker from "./ColorCirclePicker";

const colorOptions = [
  "#ff2600", // rojo
  "#2bff00", // verde
  "#60a5fa", // azul
  "#000000", // negro
  "#ff00ea", // blanco
];

export const ColorSelector = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col text-sm gap-2 fade-in-down-delay">
      <span>{label}</span>

      <div className="flex flex-row w-fit items-center gap-2">
        <ColorCirclePicker color={value} onChange={onChange} />
        {colorOptions.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            style={{ backgroundColor: color }}
            className={`w-8 h-8 border-2 rounded-[100px] border-black ${
              value === color ? "border-black" : "border-gray-300"
            }`}
          />
        ))}
        {/* Custom color */}
      </div>
    </div>
  );
};
