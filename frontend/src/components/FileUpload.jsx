import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  const handleReset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-4 font-comic">
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6 animate-bounce">🐾 Chat 🐱 ou Chien🐶 ? 🐾</h1>

      <div
        className={`w-full max-w-md rounded-xl border-4 border-dashed ${
          isDragging ? 'border-blue-400 bg-blue-100 animate-pulse' : 'border-pink-300 bg-white'
        } p-6 transition duration-300 ease-in-out`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Aperçu"
              className="rounded-lg w-64 h-64 object-cover mb-4 shadow-lg animate-fade-in"
            />
            {!result && (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-white font-bold py-2 px-4 rounded-full shadow-md hover:scale-105 transition transform duration-300"
              >
                🚀 Devine qui c'est !
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-700 font-semibold">Glisse une image ici ou</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="bg-white p-2 rounded-lg shadow-md cursor-pointer"
            />
          </div>
        )}
      </div>

      {result && (
        <div
          className={`mt-6 p-6 rounded-xl shadow-xl text-center transition-all duration-500 transform hover:scale-105 ${
            result.prediction === 'Chat' ? 'bg-pink-200 text-pink-700' : 'bg-yellow-200 text-yellow-700'
          }`}
        >
          <h2 className="text-3xl font-extrabold mb-2 animate-pulse">
            {result.prediction === 'Chat' ? '😸 Miaou, un chat !' : '🐶 Ouaf, un chien !'}
          </h2>
          <p className="text-lg font-medium">Confiance : {(result.confidence * 100).toFixed(2)}%</p>
          <div className="text-5xl mt-4 animate-bounce">
            {result.prediction === 'Chat' ? '🐈✨' : '🐕💫'}
          </div>

          {/* Bouton retour à l'accueil */}
          <button
            onClick={handleReset}
            className="mt-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition transform duration-300"
          >
            🔙 Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;