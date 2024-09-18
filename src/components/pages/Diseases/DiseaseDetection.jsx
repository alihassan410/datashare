import React from "react";
import { useNavigate } from "react-router-dom";

const DiseaseDetection = () => {
    const navigate = useNavigate();

    const handleImageDetectionClick = () => {
        navigate("/dashboard/disease_detection/disease_by_image");
    };

    const handleSymptomDetectionClick = () => {
        navigate("/dashboard/disease_detection/disease_by_symptom");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Disease Detection</h2>
                <div className="mt-8 flex flex-wrap justify-center gap-8">
                    <button
                        className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-16 rounded shadow-lg w-full sm:w-1/2 lg:w-1/4 h-60 text-2xl"
                        onClick={handleImageDetectionClick}
                    >
                        Disease Detection by Image
                    </button>
                    <button
                        className="flex justify-center items-center bg-green-500 hover:bg-green-700 text-white font-bold py-20 px-16 rounded shadow-lg w-full sm:w-1/2 lg:w-1/4 h-60 text-2xl"
                        onClick={handleSymptomDetectionClick}
                    >
                        Disease Detection by Symptoms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;
