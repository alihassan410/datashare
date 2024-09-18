import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../../api/internal";
import { setUser } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import addAdminSchema from "../../../schemas/addAdminSchema";

const AddAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await addAdmin(data);

    if (response.status === 200) {
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      navigate("/dashboard/manage_admin");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: addAdminSchema,
  });

  return (
      <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] shadow-none m-auto overflow-hidden sm:rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Add New Admin</h2>
        <TextInput
          type="username"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
          className="mb-4"
        />
        <TextInput
          type="email"
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
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
        <TextInput
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Confrim-Password"
          error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
          errormessage={errors.confirmPassword}
          className="mb-4"
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleRegister}
          >
            Add Admin
          </button>
        </div>
        {error !== "" && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>
  );
};

export default AddAdmin;
