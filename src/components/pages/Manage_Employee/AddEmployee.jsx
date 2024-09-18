import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../../api/internal"; 
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import employeeSchema from "../../../schemas/employeeSchema";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddEmployee = async () => {
    const data = {
      name: values.name,
      position: values.position,
      salary: values.salary,
      hireDate: values.hireDate,
    };
    const response = await addEmployee(data);
    if(response.status === 201){
      navigate("/dashboard/manage_employee");
    } 
    else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: '',
      position: '',
      salary: '',
      hireDate: '',
    },
    validationSchema: employeeSchema,
  });

  return (
    <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="text-center">
          <label htmlFor="name">Name</label>
          <TextInput
            type="string"
            value={values.name}
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Name"
            error={errors.name && touched.name? true : false}
            errormessage={errors.name}
          />
          </div>
          <div className="text-center">
            <label htmlFor="position">Position</label>
          <TextInput
            type="string"
            value={values.position}
            name="position"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Position"
            error={errors.position && touched.position? true : false}
            errormessage={errors.position}
          />
          </div>
          <div className="text-center">
            <label htmlFor="salary">Salary</label>
          <TextInput
            type="number"
            value={values.salary}
            name="salary"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder= 'Salary'
            error={errors.salary && touched.salary? true : false}
            errormessage={errors.salary}
          />
          </div>
          <div className="text-center">
            <label htmlFor="hireDate">Hire Date</label>
          <TextInput
            type="date"
            value={values.hireDate}
            name="hireDate"
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.hireDate && touched.hireDate? true : false}
            errormessage={errors.hireDate}
          />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        </div>
        {error!== "" && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
    </div>
  );
};

export default AddEmployee;
