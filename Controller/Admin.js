require('dotenv').config();
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${process.env.API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getDoctorPatientCount = async (req, res) => {
  try {
    const response = await axiosInstance.get("/doctorAndPatientCount");
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response ? error.response.data : "Internal Server Error");
  }
};

const getAllPatient = async (req, res) => {
  try {
    const response = await axiosInstance.get("/PatientAllInfo");
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Patient Found");
  }
};

const deletePatient = async (req, res) => {
  const ids = req.params.PatientIdsArr;
  try {
    const response = await axiosInstance.delete(`/Patient/${ids}`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Patient Found");
  }
};

const allDoctor = async (req, res) => {
  try {
    const response = await axiosInstance.get("/allDoctors");
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Doctor Found");
  }
};

const getAppointmentDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axiosInstance.get(`/DoctorAppointments/${id}`);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Doctor Found");
  }
};

const GeneratePDF = async (req, res) => {
  const data = req.body;
  try {
    const response = await axiosInstance.post("/PDF", data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No PDF Found");
  }
};

const getCasesofPatient = async (req, res) => {
  const id = req.params.patientId;
  try {
    const response = await axiosInstance.get(`/Case/${id}`);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("Error while retrieving the data");
  }
};
module.exports = {
  getDoctorPatientCount,
  getAllPatient,
  deletePatient,
  allDoctor,
  getAppointmentDoctor,
  GeneratePDF,
  getCasesofPatient,
};