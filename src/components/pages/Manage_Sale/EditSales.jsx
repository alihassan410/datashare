import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSale, updateSale } from "../../../api/internal";
import TextInput from "../../TextInput/TextInput";
import { useFormik } from "formik";
import milkSaleSchema from "../../../schemas/milkSaleSchema";

const EditSale = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [newSale, setNewSale] = useState({});

    const handleAddSale = async (values) => {
        const data = {
            customerName: values.customerName,
            quantity: values.quantity,
            pricePerLiter: values.pricePerLiter,
            totalSale: values.totalSale,
            date: values.date,
            _id: newSale._id, // Pass the _id for updating
        };

        const response = await updateSale(data);
        if (response.status === 201) {
            navigate("/dashboard/manage_sale");
        } else if (response.code === "ERR_BAD_REQUEST") {
            setError(response.response.data.message);
        }
    };

    const {
        values,
        touched,
        handleBlur,
        handleChange,
        handleSubmit, // Use Formik's handleSubmit method
        setFieldValue,
        setValues,
        errors
    } = useFormik({
        initialValues: {
            customerName: "",
            quantity: "",
            pricePerLiter: "",
            totalSale: "",
            date: "",
        },
        validationSchema: milkSaleSchema,
        onSubmit: handleAddSale,
    });

    useEffect(() => {
        const getSalesClient = async () => {
            let res = await getSale(props.id);
            const saleData = res.data.milkSales;
            if (saleData) {
                setNewSale(saleData);
                setValues({
                    customerName: saleData.customerName || "",
                    quantity: saleData.quantity || "",
                    pricePerLiter: saleData.pricePerLiter || "",
                    totalSale: saleData.totalSale || "",
                    date: saleData.date || "",
                });
            }
        };
        getSalesClient();
    }, [props.id, setValues]);

    const handleQuantityChange = (e) => {
        const quantity = parseFloat(e.target.value);
        const pricePerLiter = parseFloat(values.pricePerLiter);
        const totalSale =
            isNaN(quantity) || isNaN(pricePerLiter) ? "" : quantity * pricePerLiter;
        setFieldValue("totalSale", totalSale);
    };

    const handlePricePerLiterChange = (e) => {
        const pricePerLiter = parseFloat(e.target.value);
        const quantity = parseFloat(values.quantity);
        const totalSale =
            isNaN(quantity) || isNaN(pricePerLiter) ? "" : quantity * pricePerLiter;
        setFieldValue("totalSale", totalSale);
    };

    return (
        <div className="max-w-md w-full px-6 py-8 bg-white mt-[50px] shadow-none m-auto overflow-hidden sm:rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Edit Milk Sale</h2>
            <form onSubmit={handleSubmit}> {/* Use handleSubmit from Formik */}
                <div className="text-center">
                    <label htmlFor="customerName">Customer Name</label>
                    <TextInput
                        type="text"
                        name="customerName"
                        value={values.customerName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Customer Name"
                        error={errors.customerName && touched.customerName ? 1 : undefined}
                        errormessage={errors.customerName}
                        className="mb-4"
                    />
                </div>
                <div className="text-center">
                    <label htmlFor="quantity">Quantity (Liters)</label>
                    <TextInput
                        type="number"
                        name="quantity"
                        value={values.quantity}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            handleChange(e);
                            handleQuantityChange(e);
                        }}
                        placeholder="Quantity"
                        error={errors.quantity && touched.quantity ? 1 : undefined}
                        errormessage={errors.quantity}
                        className="mb-4"
                    />
                </div>
                <div className="text-center">
                    <label htmlFor="pricePerLiter">Price per Liter</label>
                    <TextInput
                        type="number"
                        name="pricePerLiter"
                        value={values.pricePerLiter}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            handleChange(e);
                            handlePricePerLiterChange(e);
                        }}
                        placeholder="Price per Liter"
                        error={errors.pricePerLiter && touched.pricePerLiter ? 1 : undefined}
                        errormessage={errors.pricePerLiter}
                        className="mb-4"
                    />
                </div>
                <div className="text-center">
                    <label htmlFor="totalSale">Total Sale</label>
                    <TextInput
                        type="number"
                        name="totalSale"
                        value={values.totalSale}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Total Sale"
                        readOnly // Add readOnly attribute here
                        error={errors.totalSale && touched.totalSale ? 1 : undefined}
                        errormessage={errors.totalSale}
                        className="mb-4"
                    />
                </div>
                <div className="text-center">
                    <label htmlFor="date">Date</label>
                    <TextInput
                        type="date"
                        name="date"
                        value={values.date}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.date && touched.date ? 1 : undefined}
                        errormessage={errors.date}
                        className="mb-4"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes {/* Updated the button text */}
                    </button>
                </div>
                {error !== "" && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default EditSale;
