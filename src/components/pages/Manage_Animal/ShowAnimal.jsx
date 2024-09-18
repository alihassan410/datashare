import { useState, useEffect } from "react";
import { getAllAnimal, deleteAnimal } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowAnimal() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    (async function getAllAnimalsApiCall() {
      try {
        const response = await getAllAnimal();

        if (response.status === 200) {
          setAnimals(response.data.animals);
        } else {
          console.error("Error fetching animals:", response);
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    })();
  }, []);

  const handleEditAnimal = (id) => {
    navigate(`/dashboard/manage_animal/edit_animal/${id}`);
  };

  const handleDeleteAnimal = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this animal?");
    if (!confirmDelete) {
      return; // If the user cancels, exit the function
    }

    try {
      const response = await deleteAnimal(id);
      if (response.status === 200) {
        setAnimals(animals.filter((animal) => animal._id !== id));
        navigate('/dashboard/manage_animal')
      } else {
        console.error("Error deleting animal:", response);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  const handleAddNewAnimal = () => {
    navigate('/dashboard/manage_animal/add_animal');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewAnimal}
        >
          Add New Animal
        </button>
      </div>
      {animals.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Animal Type</th>
                <th className="py-2 px-4 border-b text-left">Animal Code</th>
                <th className="py-2 px-4 border-b text-left">Breed</th>
                <th className="py-2 px-4 border-b text-left">Weight</th>
                <th className="py-2 px-4 border-b text-left">Average Milk</th>
                <th className="py-2 px-4 border-b text-left">Purchase Price</th>
                <th className="py-2 px-4 border-b text-left">With Calf</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Milking Status</th>
                <th className="py-2 px-4 border-b text-left">Purchase Date</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal._id}>
                  <td className="py-2 px-4 border-b">{animal.animalType}</td>
                  <td className="py-2 px-4 border-b">{animal._id}</td>
                  <td className="py-2 px-4 border-b">{animal.breed}</td>
                  <td className="py-2 px-4 border-b">{animal.weight}</td>
                  <td className="py-2 px-4 border-b">{animal.avg_milk}</td>
                  <td className="py-2 px-4 border-b">{animal.purchase_price}</td>
                  <td className="py-2 px-4 border-b">{animal.with_calf ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4 border-b">{animal.age}</td>
                  <td className="py-2 px-4 border-b">{animal.milking_status}</td>
                  <td className="py-2 px-4 border-b">{animal.purchase_date ? new Date(animal.purchase_date).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleEditAnimal(animal._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleDeleteAnimal(animal._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowAnimal;
