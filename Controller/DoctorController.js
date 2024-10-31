const axios = require("axios");
const addDoctor = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const response = await axios.post(
      "http://localhost:8000/api/createDoctor",
      formData
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

const getDoctorForPracticeLocationAndSpeciality = async (req, res) => {
  const practiceLocationId = req.params.practiceLocationId;
  const specialityId = req.params.specialityId;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getDoctor/${practiceLocationId}/${specialityId}`
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
const getAppointmentsForDoctor = async(req,res)=>{
  const doctorId = req.params.doctorId;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getAppointmentsForDoctor/${doctorId}`
    );
    console.log("Data Retrieved:", response.data);
    if (response.status === 400) {
      return res.status(400).send(response.data);
    }
    return res.status(200).send(response.data);
  }
  catch (error) {
    console.error("Error fetching data:",error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).send(error.response?.data || error.message);}
}


const getApppointmentCase = async(req,res)=>{
  const appointment_id = req.params.appointmentId;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getAppointmentCase/${appointment_id}`
    );
    console.log("Data Retrieved:", response.data);
    return res.status(200).send(response.data);
  }
  catch (error) {
    console.error("Error fetching data:",error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).send(error.response?.data || error.message);}
}


module.exports = { addDoctor, getDoctorForPracticeLocationAndSpeciality,getAppointmentsForDoctor,getApppointmentCase };
