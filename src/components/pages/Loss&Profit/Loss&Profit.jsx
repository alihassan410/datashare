import React, { useState } from 'react';
import { getLossProfit } from '../../../api/internal';
import TextInput from '../../TextInput/TextInput';
import lossProfitSchema from '../../../schemas/loss&profitSchema';
import { useFormik } from "formik";

const LossProfit = () => {
  const [lossProfit, setLossProfit] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fromDate: values.fromDate,
      toDate: values.toDate
    };

    try {
      const response = await getLossProfit(data);
      setLossProfit(response.data);
    } catch (error) {
      console.error('Error fetching loss/profit:', error);
    }
  };
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      fromDate: '',
      toDate: '',
    },
    validationSchema: lossProfitSchema,
  });

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Loss & Profit</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <TextInput
              id="fromDate"
              type="date"
              value={values.fromDate}
              name="fromDate"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="From Date"
              error={errors.fromDate && touched.fromDate ? 1 : undefined}
              errormessage={errors.fromDate}
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <TextInput
              id="toDate"
              type="date"
              value={values.toDate}
              name="toDate"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="To Date"
              error={errors.toDate && touched.toDate ? 1 : undefined}
              errormessage={errors.toDate}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate Loss & Profit
            </button>
          </div>
        </form>
        {lossProfit && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Income: {lossProfit.totalIncome}</p>
            <p className="text-lg font-semibold">Total Operational Expenses: {lossProfit.totalOperationalExpenses}</p>
            <p className="text-lg font-semibold">Profit or Loss: {lossProfit.profitOrLoss}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LossProfit;
