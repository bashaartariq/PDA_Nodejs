require('dotenv').config();

const axios = require("axios");

// Set up Axios Interceptor to add the Authorization header to every request
axios.interceptors.request.use(
  (config) => {
    // Add the API key from environment variables to the request header
    config.headers["Authorization"] = `Bearer ${process.env.API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Controller function for getAppointmentTypes
const getAppointmentTypes = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/api/getAppointmentType");
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
    res.status(500).send(error.response?.data || "An error occurred");
  }
};

module.exports = { getAppointmentTypes };
