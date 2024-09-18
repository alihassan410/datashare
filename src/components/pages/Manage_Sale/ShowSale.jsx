import { useState, useEffect } from "react";
import { deleteSale, getAllSales } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowSale() {
  const navigate = useNavigate();
  const [milkSales, setMilkSales] = useState([]);

  useEffect(() => {
    (async function getAllMilkSalesApiCall() {
      try {
        const response = await getAllSales();

        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedMilkSales = response.data.milkSales || [];
          console.log("Fetched items:", fetchedMilkSales);
          setMilkSales(fetchedMilkSales);
        } else {
          console.error("Error fetching milk sales:", response);
        }
      } catch (error) {
        console.error("Error fetching milk sales:", error);
      }
    })();
  }, []);

  const handleAddNewMilkSale = () => {
    navigate('/dashboard/manage_sale/add_sale');
  };

  const handleDelete = async (id) => {
    let res = await deleteSale(id);
    window.location.reload();
  }
  const handleEdit = (id) => {
    navigate("/dashboard/manage_sale/edit_sale/" + id)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewMilkSale}
        >
          Add New Milk Sale
        </button>
      </div>
      {milkSales.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Quantity (L)</th>
              <th className="py-2 px-4 border-b">Price Per Liter</th>
              <th className="py-2 px-4 border-b">Total Sale</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {milkSales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-200 transition duration-300 ease-in-out">
                <td className="py-2 px-4 border-b">{sale.customerName}</td>
                <td className="py-2 px-4 border-b">{sale.quantity}</td>
                <td className="py-2 px-4 border-b">{sale.pricePerLiter}</td>
                <td className="py-2 px-4 border-b">{sale.totalSale}</td>
                <td className="py-2 px-4 border-b">{new Date(sale.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2"
                    onClick={() => handleEdit(sale._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(sale._id)}
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

export default ShowSale;
