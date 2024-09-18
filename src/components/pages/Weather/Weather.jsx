import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getWeather } from '../../../api/external'; 
import TextInput from '../../TextInput/TextInput';


const weatherSchema = Yup.object().shape({
  city: Yup.string().required('City name is required')
});

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      city: '',
    },
    validationSchema: weatherSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const data = await getWeather(values.city, values.units, values.lang);
        if (data.cod === "404") {
          setError('City not found');
          setWeatherData(null);
        } else {
          setWeatherData(data);
        }
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('An error occurred while fetching weather data');
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-gray-400 rounded shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Weather Information</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter city name"
            error={formik.touched.city && formik.errors.city ? true : false}
            errorMessage={formik.errors.city}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Weather
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        {weatherData && !error && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold mb-2">{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°{formik.values.units === 'metric' ? 'C' : 'F'}</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Pressure: {weatherData.main.pressure} {formik.values.units === 'metric' ? 'hPa' : 'inHg'}</p>
            <p>Wind Speed: {weatherData.wind.speed} {formik.values.units === 'metric' ? 'm/s' : 'mph'}</p>
            <p>Feels Like: {weatherData.main.feels_like}°{formik.values.units === 'metric' ? 'C' : 'F'}</p>
            {weatherData.clouds && <p>Cloudiness: {weatherData.clouds.all}%</p>}
            {weatherData.rain && <p>Rain: {weatherData.rain['1h']} mm/hour</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
