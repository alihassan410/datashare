import React, { useState } from "react";
import { detectDiseaseBySymptoms } from "../../../api/internal";
import { Link } from "react-router-dom";

const DiseaseBySymptom = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState("");
    const [diseaseResult, setDiseaseResult] = useState(null);
    const [error, setError] = useState(null);

    const symptoms = [
        "Swollen",
        "painful udder",
        "Abnormal milk secretion",
        "Fever",
        "Decreased milk production",
        "Blister-like sores on mouth, feet, and teats",
        "Lameness",
        "Abortion",
        "Infertility",
        "Joint pain",
        "Coughing",
        "Nasal discharge",
        "Decreased appetite",
        "Arthritis",
        "Pneumonia",
        "Neurological signs",
        "Difficulty breathing",
        "Pleurisy",
        "Pox lesions on skin and mucous membranes",
        "Diarrhea",
        "Weight loss",
        "Emaciation",
        "Anemia",
        "Weakness",
        "Sudden death",
        "Convulsions",
        "Abdominal pain"
    ];

    const handleSymptomSelect = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const handleDetectDisease = async () => {
        setError(null);
        setDiseaseResult(null);

        const response = await detectDiseaseBySymptoms(selectedSymptoms);

        if (response?.status !== 200) {
            setError(response.response.data.message || "An error occurred");
        } else {
            setDiseaseResult(response.data.diseases);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <div>
                    <Link rel="stylesheet" to="/dashboard/disease_detection/addDiseas" >Add Diseas</Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Select Symptoms</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {symptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center">
                            <input
                                type="radio"
                                name="diseas"
                                onChange={() => setSelectedSymptoms(symptom)}
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label className="ml-2">{symptom}</label>
                        </div>
                    ))}
                </div>
                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-8 focus:outline-none focus:shadow-outline"
                    onClick={handleDetectDisease}
                >
                    Detect Disease
                </button>
                {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                {diseaseResult && (
                    <div className="mt-4 text-green-600 text-center">
                        {diseaseResult.map(disease => (
                            <div key={disease.name} className="mb-2">
                                <p><strong>Treatment:</strong> {disease.treatment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseBySymptom;
