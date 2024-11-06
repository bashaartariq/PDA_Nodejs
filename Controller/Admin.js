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

const deleteDoctor = async(req,res)=>{
  const id = req.params.id;
  console.log(id);
  try {
    const response = await axiosInstance.delete(`/doctor/${id}`);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("Error while retrieving the data");
  }
}

const deleteCases = async(req,res)=>{
  const caseArr = req.params.id;
  console.log(caseArr);
  try {
    const response = await axiosInstance.delete(`/Case/${caseArr}`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Case Found");
  }
}

const deleteAppointment = async(req,res)=>{
  const AppointmentArr = req.params.id;
  console.log(AppointmentArr);
  try {
    const response = await axiosInstance.delete(`/Appointment/${AppointmentArr}`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Case Found");
  }
}

const searchCases = async(req,res)=>{
  const type = req.params.type;
  const term = req.params.term;
  const patientId = req.params.patientId;
  try {
    const response = await axiosInstance.get(`/SearchCases/${type}/${term}/${patientId}`);
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Case Found");
  }
}

const searchAppointment = async(req,res)=>{
  const type = req.params.type;
  const term = req.params.term;
  const patinetId = req.params.patientId;
  try{
    const response = await axiosInstance.get(`/SearchAppointment/${type}/${term}/${patinetId}`);
    console.log("Data received : ",response.data);
    return res.status(200).send(response.data);
  }
  catch(err)
  {
    return res.status(500).send("No Appointment Found");
  }
}




module.exports = {
  getDoctorPatientCount,
  getAllPatient,
  deletePatient,
  allDoctor,
  getAppointmentDoctor,
  GeneratePDF,
  getCasesofPatient,
  deleteDoctor,deleteCases,
  deleteAppointment,searchCases,
  searchAppointment
};
