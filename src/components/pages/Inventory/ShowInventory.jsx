import { useState, useEffect } from "react";
import { getAllInventory, deleteInventory } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowInventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async function getAllInventorysApiCall() {
      try {
        const response = await getAllInventory();

        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedItems = response.data.inventory || [];
          console.log("Fetched items:", fetchedItems);
          setItems(fetchedItems);
        } else {
          console.error("Error fetching inventories:", response);
        }
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    })();
  }, []);

  const handleEditInventory = (id) => {
    navigate(`/dashboard/manage_inventory/edit/${id}`);
  };

  const handleDeleteInventory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        const response = await deleteInventory(id);
        if (response.status === 200) {
          setItems(items.filter((item) => item._id !== id));
          navigate('/dashboard/manage_inventory');
        } else {
          console.error("Error deleting inventories:", response);
        }
      } catch (error) {
        console.error("Error deleting inventories:", error);
      }
    }
  };

  const handleAddNewInventory = () => {
    navigate('/dashboard/manage_inventory/add_inventory');
  };

  console.log("Rendering items:", items);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewInventory}
        >
          Add New Inventory
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item Name</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{item.itemName}</td>
                <td className="py-2 px-4 border-b">{item.stock}</td>
                <td className="py-2 px-4 border-b flex justify-center">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteInventory(item._id)}
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

export default ShowInventory;
