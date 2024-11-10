require("dotenv").config();
const axios = require("axios");
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${process.env.API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createSpeciality = async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(
      "http://localhost:8000/api/speciality",
      data
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || "An error occurred");
  }
};

const updateSpeciality = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const response = await axios.put(
      `http://localhost:8000/api/speciality/${id}`,
      data
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || "An error occurred");
  }
};

const deleteSpeciality = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/speciality/${id}`
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || "An error occurred");
  }
};
module.exports = {
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
};
