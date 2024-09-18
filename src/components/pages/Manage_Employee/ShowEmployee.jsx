import { useState, useEffect } from "react";
import { deleteEmployeeByID, getAllEmployees } from "../../../api/internal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function ShowEmployee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async function getAllEmployeesApiCall() {
      try {
        const response = await getAllEmployees();

        if (response.status === 200) {
          if (Array.isArray(response.data.employees)) {
            setEmployees(response.data.employees);
          } else {
            console.error("API response 'employees' property does not contain an array:", response.data);
          }
        } else {
          console.error("Error fetching employees:", response);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    })();
  }, []);


  const handleNewEmployee = () => {
    navigate('/dashboard/manage_employee/add_employee');
  };
  const handleEdit = (id) => {
    navigate("/dashboard/manage_employee/edit/" + id);
  };

  const handleDelete = async (id) => {
    let res = await deleteEmployeeByID(id);
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNewEmployee}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add New Employee
        </button>
      </div>
      {employees.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-white mt-4 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">Hire Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.position}</td>
                <td className="py-2 px-4 border-b">{employee.salary}</td>
                <td className="py-2 px-4 border-b">{moment(employee.hireDate).format("MMM Do YY")}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(employee._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(employee._id)}
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

export default ShowEmployee;
