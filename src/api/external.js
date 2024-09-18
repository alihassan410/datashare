import axios from "axios";

const WEATHER_API_ENDPOINT = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b6bf545db552569bdab7a71c71d06911`;

export const getWeather = async (city) => {
    let response;
  
    try {
      response = await axios.get(WEATHER_API_ENDPOINT(city));
      response = response.data;
    } catch (error) {
      console.error(error);
      response = null;
    }
  
    return response;
};
