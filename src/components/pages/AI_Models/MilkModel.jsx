import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function MilkPrediction() {
  const ANIMAL_TYPES = ['Cow', 'Buffalo'];
  const COW_BREEDS = ["Holstein", "Jersey", "Guernsey", "Ayrshire", "Brown Swiss", "Milking Shorthorn", "Red Sindhi", "Sahiwal", "Gir", "Tharparkar", "Angus", "Hereford", "Charolais", "Limousin", "Simmental", "Brahman", "Texas Longhorn", "Belgian Blue", "Wagyu"];
  const BUFFALO_BREEDS = ["Murrah", "Nili-Ravi", "Surti", "Jafarabadi", "Mehsana", "Bhadawari", "Mediterranean", "Carabao", "Thai Buffalo", "Chinese Buffalo", "Vietnamese Buffalo"];

  const [model, setModel] = useState(null);
  const [inputData, setInputData] = useState({
    AnimalType: '',
    Breed: '',
    Temperature: 0,
    Pregnancy: false,
    Age: 0
  });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const modelUrl = 'https://drive.google.com/u/0/uc?id=1--wpE85Gw8djGTYdxGoHXhyBJSaDMoNX&export=download';
      try {
        const loadedModel = await tf.loadLayersModel(modelUrl);
        setModel(loadedModel);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    loadModel();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData(prevData => ({
     ...prevData,
      [name]: type === 'checkbox'? checked : value
    }));
  };

  const handlePredictClick = async () => {
    if (!model ||!inputData.AnimalType ||!inputData.Breed ||!inputData.Temperature ||!inputData.Age) {
      console.log('Please fill in all fields');
      return;
    }
    const breedIndex = inputData.AnimalType === 'Cow'? COW_BREEDS.indexOf(inputData.Breed) : BUFFALO_BREEDS.indexOf(inputData.Breed);
    if (breedIndex === -1) {
      console.error('Selected breed not recognized.');
      return;
    }

    const inputTensor = tf.tensor2d([[breedIndex, inputData.Temperature, inputData.Pregnancy? 1 : 0, inputData.Age]], [1, 4]);
    try {
      const output = model.predict(inputTensor);
      const predictionResult = output.dataSync()[0];
      setPrediction(predictionResult);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full mx-auto p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">Milk Prediction</h2>
        <label className="block">
          <span className="text-gray-700">Animal Type:</span>
          <select name="AnimalType" value={inputData.AnimalType} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select an animal type</option>
            {ANIMAL_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Breed:</span>
          <select name="Breed" value={inputData.Breed} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="">Select a breed</option>
            {(inputData.AnimalType === 'Cow'? COW_BREEDS : BUFFALO_BREEDS).map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Temperature:</span>
          <input type="number" name="Temperature" value={inputData.Temperature} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
        </label>
        <label className="block">
          <span className="text-gray-700">Pregnancy:</span>
          <input type="checkbox" name="Pregnancy" checked={inputData.Pregnancy} onChange={handleInputChange} className="mt-1"/>
        </label>
        <label className="block">
          <span className="text-gray-700">Age:</span>
          <input type="number" name="Age" value={inputData.Age} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
        </label>
        <button onClick={() => {}} className="mt-4 px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Predict
        </button>
        {prediction!== null && <p className="mt-4 text-lg">Prediction: {prediction}</p>}
      </div>
    </div>
  );
}

export default MilkPrediction;
