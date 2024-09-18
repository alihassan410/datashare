import { useState, useEffect } from "react";
import { deleteMilk, getAllMilk } from "../../../api/internal";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function ShowMilk() {
  const navigate = useNavigate();
  const [milks, setMilks] = useState([]);
  const [Cow, setCow] = useState([]);
  const [Buffalo, setBuffalo] = useState([]);

  useEffect(() => {
    (async function getAllMilksApiCall() {
      try {
        const response = await getAllMilk();

        if (response.status === 200) {
          const allMilks = response.data.milks;
          setMilks(allMilks);

          const cow = allMilks.filter(item => item.animalType !== "buffalo");
          setCow(cow);

          const buffalo = allMilks.filter(item => item.animalType === "buffalo");
          setBuffalo(buffalo);
        } else {
          console.error("Error fetching milks:", response);
        }
      } catch (error) {
        console.error("Error fetching milks:", error);
      }
    })();
  }, []);

  const handleNewMilk = () => {
    navigate('/dashboard/manage_milk/add_milk');
  };
  const deleteMilkClient = async (id) => {
    await deleteMilk(id)
    window.location.reload();
  }
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewMilk}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Milk
        </button>
      </div>
      {milks.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <div>
          <div className="mt-4">
            <h1 className="text-center mb-[20px] text-xl font-semibold">Buffalo:</h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="text-center">
                  <th className="py-2 px-2 border-b">Animal Type</th>
                  <th className="py-2 px-2 border-b">Animal Code</th>
                  <th className="py-2 px-2 border-b">Date</th>
                  <th className="py-2 px-2 border-b">Time</th>
                  <th className="py-2 px-2 border-b">Quantity</th>
                  <th className="py-2 px-2 border-b">Edit</th>
                  <th className="py-2 px-2 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {Buffalo.map((milk) => (
                  <tr key={milk._id} className="text-center">
                    <td className="py-2 px-2 border-b">{milk.animalType}</td>
                    <td className="py-2 px-2 border-b">{milk.animal_code}</td>
                    <td className="py-2 px-2 border-b">{moment(milk.date).format("MMM Do YY")}</td>
                    <td className="py-2 px-2 border-b">{milk.time}</td>
                    <td className="py-2 px-2 border-b">{milk.quantity}</td>
                    <td><Link to={"/dashboard/Edit_milk/" + milk._id} className="py-[2px] px-[15px] bg-blue-500 rounded-md text-white">Edit</Link></td>
                    <td><button onClick={() => deleteMilkClient(milk._id)} className="py-[2px] px-[15px] bg-red-500 rounded-md text-white">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h1 className="text-center mb-[20px] text-xl font-semibold">Cow:</h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="text-center">
                  <th className="py-2 px-2 border-b">Animal Type</th>
                  <th className="py-2 px-2 border-b">Animal Code</th>
                  <th className="py-2 px-2 border-b">Date</th>
                  <th className="py-2 px-2 border-b">Time</th>
                  <th className="py-2 px-2 border-b">Quantity</th>
                  <th className="py-2 px-2 border-b">Edit</th>
                  <th className="py-2 px-2 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {Cow.map((milk) => (
                  <tr key={milk._id} className="text-center">
                    <td className="py-2 px-2 border-b">{milk.animalType}</td>
                    <td className="py-2 px-2 border-b">{milk.animal_code}</td>
                    <td className="py-2 px-2 border-b">{moment(milk.date).format("MMM Do YY")}</td>
                    <td className="py-2 px-2 border-b">{milk.time}</td>
                    <td className="py-2 px-2 border-b">{milk.quantity}</td>
                    <td><Link to={"/dashboard/Edit_milk/" + milk._id} className="py-[2px] px-[15px] bg-blue-500 rounded-md text-white">Edit</Link></td>
                    <td><button onClick={() => deleteMilkClient(milk._id)} className="py-[2px] px-[15px] bg-red-500 rounded-md text-white">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowMilk;
