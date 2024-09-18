import React, { useState } from "react";
import { AddDiseaseBySymptoms, detectDiseaseBySymptoms } from "../../../api/internal";

const AddDiseases = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState({
        symptom: "",
        daignose: ""
    });
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

    const handleDetectDisease = async () => {
        setError(null);
        setDiseaseResult(null);

        const response = await AddDiseaseBySymptoms(selectedSymptoms);
        if (response.data.message === "Added") {
            setDiseaseResult("Added");
        }
        if (response?.status !== 200) {
            setError(response.response.data.message || "An error occurred");
        } else {
            setDiseaseResult(response.data.diseases);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Select Symptoms</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {symptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center">
                            <input
                                type="radio"
                                name="diseas"
                                onChange={() => setSelectedSymptoms({ ...selectedSymptoms, symptom: symptom })}
                                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label className="ml-2">{symptom}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <textarea className="w-full border-2 mt-8" type="text" value={selectedSymptoms.daignose} onChange={(e) => setSelectedSymptoms({ ...selectedSymptoms, daignose: e.target.value })} />
                </div>
                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-8 focus:outline-none focus:shadow-outline"
                    onClick={handleDetectDisease}
                >
                    Add Disease
                </button>
                {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                {diseaseResult === "Added" && <div className="mt-4 text-blue-500 text-center">{diseaseResult}</div>}
            </div>
        </div>
    );
};

export default AddDiseases;
