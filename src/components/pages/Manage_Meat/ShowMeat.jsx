import { useState, useEffect } from "react";
import { deleteMeatAnimal, deleteMeatAnimalReal, getAllMeatAnimals } from "../../../api/internal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function ShowMeat() {
  const navigate = useNavigate();
  const [meats, setMeats] = useState([]);

  useEffect(() => {
    (async function getAllMeatsApiCall() {
      try {
        const response = await getAllMeatAnimals();

        if (response.status === 200) {
          // Check if the 'meats' property exists and is an array
          if (Array.isArray(response.data.meats)) {
            setMeats(response.data.meats);
          } else {
            console.error("API response 'meats' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching meats:", response);
        }
      } catch (error) {
        console.error("Error fetching meats:", error);
      }
    })();
  }, []);


  const handleNewMeat = () => {
    navigate('/dashboard/manage_meat/add_meat');
  };
  const handleDelete = async (id) => {
    const res = await deleteMeatAnimalReal(id);
    window.location.reload();
  }
  const handleEdit = async (id) => {
    navigate('/dashboard/manage_meat/Edit_meat/' + id);
  }
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewMeat}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Meat
        </button>
      </div>
      {meats.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Animal Type</th>
              <th className="px-4 py-2">Animal Code</th>
              <th className="px-4 py-2">Sex</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Purchase Price</th>
              <th className="px-4 py-2">Purchase Date</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meats.map((meat) => (
              <tr key={meat.animal_code} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{meat.animalType}</td>
                <td className="border px-4 py-2">{meat.animal_code}</td>
                <td className="border px-4 py-2">{meat.sex}</td>
                <td className="border px-4 py-2">{meat.weight}</td>
                <td className="border px-4 py-2">{meat.purchase_price}</td>
                <td className="border px-4 py-2">{moment(meat.purchase_date).format("MMM Do YYYY")}</td>
                <td className="border px-4 py-2">{meat.age}</td>
                <td className="border px-4 py-2 space-x-1 flex justify-around">
                  <button
                    onClick={() => handleEdit(meat._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(meat._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
}

export default ShowMeat;
