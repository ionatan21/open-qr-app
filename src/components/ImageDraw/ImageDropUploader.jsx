// ImageDropUploader.jsx
import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

const ImageDropUploader = ({ onImageSelect }) => {
  const fileInputRef = useRef();
  const [message, setMessage] = useState(
    "Arrastra una imagen aquí o haz clic para subir un logo"
  );

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessage("Imagen cargada con éxito");
      onImageSelect(file);
    } else {
      setMessage("Formato de archivo no válido");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
      ];

      if (validImageTypes.includes(file.type)) {
        setMessage("Imagen cargada con éxito");
        onImageSelect(file);
      } else {
        setMessage("Formato de imagen no válido");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    setMessage("Suelta la imagen aquí");
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    setMessage("Arrastra una imagen aquí o haz clic para subir un logo");
    e.preventDefault();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragEnterCapture={handleDragEnter}
      onDragLeaveCapture={handleDragLeave}
      onDragOver={handleDragOver}
      className="flex flex-col fade-in-down-delay items-center justify-center gap-2 border-2 border-dashed border-gray-400 bg-black/70 text-white rounded-lg p-6 text-center cursor-pointer hover:bg-black transition"
    >
      <UploadCloud className="w-8 h-8 text-white mb-2" />
      <p
        className={`${
          message === "Formato de imagen no válido"
            ? "text-red-500"
            : "text-white"
        } text-sm font-medium`}
      >
        {message}
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageDropUploader;
