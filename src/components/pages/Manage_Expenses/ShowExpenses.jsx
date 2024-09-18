import { useState, useEffect } from "react";
import { deleteExpense, getAllExpense } from "../../../api/internal";
import { useNavigate } from "react-router-dom";

function ShowExpense() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async function getAllExpensesApiCall() {
      try {
        const response = await getAllExpense();

        console.log("API Response:", response);

        if (response.status === 200) {
          const fetchedExpenses = response.data.expenses || [];
          console.log("Fetched items:", fetchedExpenses);
          setExpenses(fetchedExpenses);
        } else {
          console.error("Error fetching expenses:", response);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    })();
  }, []);

  const handleAddNewExpense = () => {
    navigate('/dashboard/manage_expense/add_expense');
  };
  const handleDelete = async (id) => {
    let res = await deleteExpense(id);
    window.location.reload();
  }
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleAddNewExpense}
        >
          Add New Expense
        </button>
      </div>
      {expenses.length === 0 ? (
        <p className="text-center font-bold mt-6">No records found</p>
      ) : (
        <table className="min-w-full bg-gray-100 rounded-lg text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Expense Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date Incurred</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-gray-200 transition duration-300 ease-in-out">
                <td className="py-2 px-4 border-b">{expense.expenseType}</td>
                <td className="py-2 px-4 border-b">{expense.amount}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(expense.dateIncurred).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    onClick={() => handleDelete(expense._id)}
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

export default ShowExpense;
