import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import SelectInput from "../../SelectInput/SelectInput";
import { useFormik } from "formik";
import expenseSchema from "../../../schemas/expenseSchema";

const AddExpense = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddExpense = async () => {
    const data = {
      expenseType: values.expenseType,
      amount: values.amount,
      dateIncurred: values.dateIncurred,
    };

    const response = await addExpense(data);

    if (response.status === 201) {
      navigate("/dashboard/manage_expense");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      itemName: "",
      price: "",
      stock: "",
    },
    validationSchema: expenseSchema,
  });

  return (
    <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Add New Expense
      </h2>
      <div className="text-center">
        <label htmlFor="expenseType">Expense Type</label>
        <SelectInput
          className="w-9"
          options={[
            { value: "none", text: "Select any one.." },
            { value: "Feed", text: "Feed" },
            { value: "Medicine", text: "Medicine" },
            { value: "Maintenance", text: "Maintenance"},
            { value: "Transportation", text: "Transportation"},
            { value: "Other", text: "Other" },
          ]}
          value={values.expenseType}
          name="expenseType"
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.expenseType && touched.expenseType ? true : false}
          errorMessage={errors.expenseType}
        />
      </div>
      <div className="text-center">
        <label htmlFor="amount">Amount</label>
        <TextInput
          type="number"
          name="amount"
          value={values.amount}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Amount"
          error={errors.amount && touched.amount ? 1 : undefined}
          errormessage={errors.amount}
          className="mb-4"
        />
      </div>
      <div className="text-center">
        <label htmlFor="dateIncurred">Date Incurred</label>
        <TextInput
          type="date"
          name="dateIncurred"
          value={values.dateIncurred}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.dateIncurred && touched.dateIncurred ? 1 : undefined}
          errormessage={errors.dateIncurred}
          className="mb-4"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleAddExpense}
        >
          Add
        </button>
      </div>
      {error !== "" && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default AddExpense;
