// ImageDropUploader.jsx
import { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

const ImageDropUploader = ({ onImageSelect }) => {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col fade-in-down-delay items-center justify-center gap-2 border-2 border-dashed border-gray-400 bg-black/80 text-white rounded-lg p-6 text-center cursor-pointer hover:bg-black transition"
    >
      <UploadCloud className="w-8 h-8 text-white mb-2" />
      <p className="text-sm font-medium">
        Arrastra una imagen aquí o haz clic para subir un logo
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
