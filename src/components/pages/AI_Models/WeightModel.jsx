import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useState } from 'react';
import '../../../../src/models/model.json';

const WeightModel = () => {
  const [model, setModel] = useState(null);
  const [inputData, setInputData] = useState({ animalType: '', breed: '', temperature: '', age: '' });
  const [prediction, setPrediction] = useState(null);

  const modelUrl = 'src/models/model.json'; 

  const animalTypeMapping = {
    'Cow': ['Holstein', 'Jersey', 'Guernsey', 'Ayrshire', 'Brown Swiss', 'Milking Shorthorn', 'Red Sindhi', 'Sahiwal', 'Gir', 'Tharparkar'],
    'Buffalo': ['Murrah', 'Nili-Ravi', 'Surti', 'Jafarabadi', 'Mehsana', 'Bhadawari', 'Mediterranean'],
    'Bull': ['Angus', 'Hereford', 'Charolais', 'Limousin', 'Simmental', 'Brahman', 'Texas Longhorn', 'Belgian Blue', 'Wagyu'],
    'Goat': ['Carabao', 'Thai Buffalo', 'Chinese Buffalo', 'Vietnamese Buffalo']
  };

  const breedMapping = {
    'Holstein': 0, 'Jersey': 1, 'Guernsey': 2, 'Ayrshire': 3, 'Brown Swiss': 4, 'Milking Shorthorn': 5,
    'Red Sindhi': 6, 'Sahiwal': 7, 'Gir': 8, 'Tharparkar': 9, 'Angus': 10, 'Hereford': 11, 'Charolais': 12,
    'Limousin': 13, 'Simmental': 14, 'Brahman': 15, 'Texas Longhorn': 16, 'Belgian Blue': 17, 'Wagyu': 18,
    'Murrah': 19, 'Nili-Ravi': 20, 'Surti': 21, 'Jafarabadi': 22, 'Mehsana': 23, 'Bhadawari': 24, 'Mediterranean': 25,
    'Carabao': 26, 'Thai Buffalo': 27, 'Chinese Buffalo': 28, 'Vietnamese Buffalo': 29
  };

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel(modelUrl);
      setModel(loadedModel);
    };

    loadModel();
  }, [modelUrl]);

  const handlePredict = async () => {
    if (model && inputData.breed && inputData.temperature && inputData.age) {
      const breedIndex = breedMapping[inputData.breed];
      if (breedIndex === undefined) {
        alert('Invalid breed');
        return;
      }
      const temperature = parseFloat(inputData.temperature);
      const age = parseInt(inputData.age, 10);

      const inputTensor = tf.tensor2d([[breedIndex, temperature, age]]);
      const outputTensor = model.predict(inputTensor);
      const prediction = outputTensor.dataSync()[0];
      setPrediction(prediction);
    }
  };

  const handleAnimalTypeChange = (e) => {
    const selectedAnimalType = e.target.value;
    setInputData({ ...inputData, animalType: selectedAnimalType, breed: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Weight Prediction</h1>
        <div className="mb-4">
          <select
            value={inputData.animalType}
            onChange={handleAnimalTypeChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            <option value="">Select animal type</option>
            {Object.keys(animalTypeMapping).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={inputData.breed}
            onChange={(e) => setInputData({ ...inputData, breed: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            disabled={!inputData.animalType}
          >
            <option value="">Select breed</option>
            {inputData.animalType && animalTypeMapping[inputData.animalType].map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
          <input
            type="text"
            value={inputData.temperature}
            onChange={(e) => setInputData({ ...inputData, temperature: e.target.value })}
            placeholder="Enter temperature"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            value={inputData.age}
            onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
            placeholder="Enter age"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <button
          onClick={handlePredict}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Predict
        </button>
        {prediction !== null && (
          <p className="mt-4 text-center text-lg font-semibold">Predicted Weight: {prediction}</p>
        )}
      </div>
    </div>
  );
};

export default WeightModel;
