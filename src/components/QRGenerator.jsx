import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image'; // Importa la librería para convertir a PNG

const QRGenerator = () => {
  const [valor, setValor] = useState('');
  const qrRef = useRef(); // Referencia para el código QR

  const handleDownload = () => {
    const svg = qrRef.current;

    // Convertir el SVG a PNG
    toPng(svg)
      .then((dataUrl) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'qr-code.png';
        a.click();
      })
      .catch((error) => {
        console.error('Error al convertir a PNG:', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md canvas-container">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Generador de QR</h1>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Escribe un enlace"
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {valor && (
          <div className="qr-container flex flex-col items-center mb-6">
            <div ref={qrRef}>
              <QRCodeSVG
                value={valor}
                size={256}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <button
              onClick={handleDownload}
              className="download-button cursor-pointer mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
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