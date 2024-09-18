import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../../TextInput/TextInput';
import { useFormik } from 'formik';
import registerSchema from '../../../schemas/registerSchema';
import { useDispatch } from 'react-redux';
import { EditUser, GetUserByIdFront } from '../../../api/internal';
const ManageAdminEdit = () => {
    const params = useParams();
    const EmployeeId = params.id;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, touched, handleBlur, handleChange, errors, setValues } = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
        },
        validationSchema: registerSchema,
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await GetUserByIdFront(EmployeeId);
                setValues(prevValues => ({
                    ...prevValues,
                    email: user.email,
                    name: user.username,
                }));
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [EmployeeId, setValues]);

    const handleLogin = async () => {
        const data = {
            email: values.email,
            password: values.password, // Ensure to handle this field appropriately
            name: values.name,
        };

        try {
            await EditUser(data);
            navigate("/dashboard/manage_admin");
        } catch (error) {
            // Handle errors that occur during the API call
            console.error("Error during login:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };
    return (
        <div>
            {/* Sidebar and Main Content */}
            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <div className="flex flex-col flex-grow">
                    {/* Dashboard Header */}
                    <DashboardHeader />

                    {/* Dashboard Content */}
                    <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] bg-opacity-80 shadow-md m-auto overflow-hidden sm:rounded-lg">
                        <h2 className="text-3xl font-bold text-center mb-8">Update</h2>
                        <TextInput
                            type="text"
                            name="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Username"
                            error={errors.name && touched.name ? 1 : undefined}
                            errormessage={errors.name}
                            className="mb-4"
                        />
                        <TextInput
                            type="password"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Password"
                            error={errors.password && touched.password ? 1 : undefined}
                            errormessage={errors.password}
                            className="mb-4"
                        />
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={handleLogin}
                            >
                                Update
                            </button>
                        </div>
                        {error !== "" && (
                            <p className="text-red-500 text-center mt-4">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAdminEdit;