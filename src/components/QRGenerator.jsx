import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import ImageDropUploader from "./ImageDropUploader";
import { ColorSelector } from "./ColorSelector";

const QRGenerator = () => {
  const [valor, setValor] = useState("");
  const [size, setSize] = useState(200);
  const [maxSize, setMaxSize] = useState(window.innerWidth / 2);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [level, setLevel] = useState("L");
  const [embeddedImg, setEmbeddedImg] = useState(null);
  const qrRef = useRef();

  const handleDownload = () => {
    const svg = qrRef.current;
    toPng(svg)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "qr-code.png";
        a.click();
      })
      .catch((error) => {
        console.error("Error al convertir a PNG:", error);
      });
  };

  useEffect(() => {
    const updateMax = () => {
      setMaxSize(window.innerWidth / 2), setSize(200);
    };
    window.addEventListener("resize", updateMax);
    return () => window.removeEventListener("resize", updateMax);
  }, []);

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    if (newSize <= maxSize) {
      setSize(newSize);
    }
  };

  const handleImageSelect = (file) => {
    const newfile = file;
    if (newfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmbeddedImg(reader.result);
      };
      reader.readAsDataURL(newfile);
    }
    // Aquí podés hacer otras cosas, como subirlo a Firestore, generar URL, etc.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white fade-in-down p-8 rounded-lg shadow-2xl w-full max-w-max">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Generador de QR
        </h1>

        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Escribe un enlace o texto"
          className="w-full p-3 mb-4 border rounded-md fade-in-down-delay"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col text-sm gap-1 fade-in-down-delay">
            Tamaño (px):
            <input
              type="number"
              value={size}
              onChange={handleSizeChange}
              min={0}
              max={maxSize}
              className="p-2 border rounded w-full h-10"
            />
            <span className="text-xs text-gray-500">Máximo: {maxSize}px</span>
          </label>

          <label className="flex flex-col text-sm fade-in-down-delay">
            Nivel de corrección:
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="p-2 h-10 mt-1 border rounded"
            >
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </label>


          <ColorSelector
            label="Color del QR:"
            value={fgColor}
            onChange={setFgColor}
          />
        </div>

        <ImageDropUploader onImageSelect={handleImageSelect} />

        {valor && (
          <div className="qr-container flex flex-col items-center my-6">
            <div
              ref={qrRef}
              className="border-2 border-gray-300 p-4 rounded-md"
            >
              <QRCodeSVG
                value={valor}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level={level}
                imageSettings={
                  embeddedImg
                    ? {
                        src: embeddedImg,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>
            <button
              onClick={handleDownload}
              className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Descargar QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
