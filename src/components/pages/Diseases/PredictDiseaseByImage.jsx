import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import 'tailwindcss/tailwind.css';

const ImageClassifier = () => {
  const imagePreviewRef = useRef(null);
  const labelContainerRef = useRef(null);
  let model, maxPredictions;

  useEffect(() => {
    const init = async () => {
      const modelURL = 'https://teachablemachine.withgoogle.com/models/07qyGqX3s/model.json';
      const metadataURL = 'https://teachablemachine.withgoogle.com/models/07qyGqX3s/metadata.json';

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const labelContainer = labelContainerRef.current;
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
      }
    };

    init();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const image = await loadImage(e.target.result);
        imagePreviewRef.current.src = image.src;
        predict(image);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const predict = async (image) => {
    const prediction = await model.predict(image, false);
    const labelContainer = labelContainerRef.current;
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
      labelContainer.childNodes[i].textContent = classPrediction;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xs">
        <img ref={imagePreviewRef} id="imagePreview" className="h-72 w-full object-cover" alt="Preview" />
      </div>
      <div className="mt-4">
        <input type="file" id="imageUpload" className="btn btn-primary block mx-auto" onChange={handleFileChange} />
      </div>
      <div ref={labelContainerRef} className="mt-4 text-center text-black text-lg"></div>
    </div>
  );
};

export default ImageClassifier;
