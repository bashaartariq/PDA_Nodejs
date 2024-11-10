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

const getFirm = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/api/getFirm");
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};

const getInsurance = async (req, res) => {
  console.log("Working");
  const firm = req.params.firm;
  console.log(firm);
  try {
    const response = await axios.get(`http://localhost:8000/api/getInsurance`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};
const createInsurance = async (req, res) => {
  console.log("Working");
  const data = req.body;
  try {
    const response = await axios.post(
      `http://localhost:8000/api/insurance`,
      data
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};
const updateInsurance = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const response = await axios.put(
      `http://localhost:8000/api/insurance/${id}`,
      data
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};
const deleteInsurance = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/insurance/${id}`
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};

const createFirm = async (req, res) => {
  console.log("Working");
  const data = req.body;
  try {
    const response = await axios.post(`http://localhost:8000/api/firm`, data);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};
const updateFirm = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const response = await axios.put(
      `http://localhost:8000/api/firm/${id}`,
      data
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};
const deleteFirm = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.delete(`http://localhost:8000/api/firm/${id}`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response?.data || error.message);
  }
};

module.exports = {
  getFirm,
  getInsurance,
  createInsurance,
  updateInsurance,
  deleteInsurance,
  createFirm,
  updateFirm,
  deleteFirm,
};
