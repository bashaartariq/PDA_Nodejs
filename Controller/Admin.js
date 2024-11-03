const axios = require("axios");
const getDoctorPatientCount = async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/doctorAndPatientCount"
    );
    console.log("Data Retrived : ", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response.data);
  }
};
const getAllPatient = async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/PatientAllInfo"
    );
    console.log("Data Retrived : ", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Patient Found");
  }
};

const deletePatient = async (req, res) => {
  console.log(req.params.PatientIdsArr);
  const ids = req.params.PatientIdsArr;
  console.log(ids);
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/Patient/${req.params.PatientIdsArr}`
    );
    console.log("Data Retrived : ", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Patient Found");
  }
};

const allDoctor = async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/allDoctors`);
    console.log("Data Retrived : ", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send("No Doctor Found");
  }
};
module.exports = {
  getDoctorPatientCount,
  getAllPatient,
  deletePatient,
  allDoctor,
};
