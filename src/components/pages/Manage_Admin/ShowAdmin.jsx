import { useState, useEffect } from "react";
import { getAllAdmin, deleteAdmin } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async function getAllAdminssApiCall() {
      try {
        const response = await getAllAdmin();

        if (response.status === 200) {
          setAdmins(response.data.admins);
        } else {
          console.error("Error fetching admins:", response);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    })();
  }, []);

  const handleEditAdmin = (id) => {
    navigate(`/dashboard/manage_admin/edit_admin/${id}`);
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await deleteAdmin(id);
      if (response.status === 200) {
        setAdmins(admins.filter((admin) => admin._id !== id));
        navigate('/dashboard/manage_admin')
      } else {
        console.error("Error deleting admin:", response);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleAddNewAdmin = () => {
    navigate('/dashboard/manage_admin/add_admin');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewAdmin}
        >
          Add New Admin
        </button>
      </div>
      {admins.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="py-2 px-4 border-b">{admin.username}</td>
                <td className="py-2 px-4 border-b">{admin.email}</td>
                <td className="py-2 px-4 border-b flex justify-end">
                  <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditAdmin(admin._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteAdmin(admin._id)}
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

export default ShowAdmin;
