import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEmployee, getEmployeeById } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import employeeSchema from "../../../schemas/employeeSchema";

const EditEmployeeForm = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [newEmployee, setNewEmployee] = useState({});

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            position: '',
            salary: '',
            hireDate: '',
        },
        validationSchema: employeeSchema,
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                position: values.position,
                salary: values.salary,
                hireDate: values.hireDate,
                _id: newEmployee._id,
            };
            const response = await updateEmployee(data);
            if (response.status === 201) {
                navigate("/dashboard/manage_employee");
            } else if (response.code === "ERR_BAD_REQUEST") {
                setError(response.response.data.message);
            }
        },
    });

    const { values, touched, handleBlur, handleChange, errors, setValues } = formik;
    useEffect(() => {
        const getEmployee = async () => {
            let res = await getEmployeeById(props.id);
            setNewEmployee(res.data.employees);
        };
        getEmployee();
    }, [props.id]);
    useEffect(() => {
        if (newEmployee) {
            setValues({
                name: newEmployee.name || '',
                position: newEmployee.position || '',
                salary: newEmployee.salary || '',
                hireDate: newEmployee.hireDate ? newEmployee.hireDate.split("T")[0] : '',
            });
        }
    }, [newEmployee]);

    return (
        <div className="max-w-lg w-full px-0 py-9 bg-white mt-[30px] shadow-none m-auto overflow-hidden sm:rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Edit Employee</h2>
            <form onSubmit={formik.handleSubmit}>
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
                            error={errors.name && touched.name ? true : false}
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
                            error={errors.position && touched.position ? true : false}
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
                            placeholder='Salary'
                            error={errors.salary && touched.salary ? true : false}
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
                            error={errors.hireDate && touched.hireDate ? true : false}
                            errormessage={errors.hireDate}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
            {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
            )}
        </div>
    );
};

export default EditEmployeeForm;