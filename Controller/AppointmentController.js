const axios = require("axios");
const addAppointment = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const response = await axios.post(
      "http://localhost:8000/api/addAppointment",
      formData
    );

    console.log("Data Retrieved:", response.data);
    if (response.status === 400) {
      return res.status(400).send(response.data);
    }

    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || error.message);
  }
};

const getAppointment = async (req, res) => {
  const caseId = req.params.CaseID;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getAppointment/${caseId}`
    );
    console.log("Data Retrieved:", response.data);
    if (response.status === 400) {
      return res.status(400).send(response.data);
    }

    return res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res
      .status(error.response?.status || 500)
      .send(error.response?.data || error.message);
  }
};
const updateAppointment = async(req,res)=>{
  try {
    const appointmentId = req.params.appointment_id;
    const data = req.body;
    console.log(data);
    const response = await axios.put(
      `http://localhost:8000/api/updateAppointment/${appointmentId}`,data
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

}
module.exports = { addAppointment, getAppointment,updateAppointment };