const axios = require("axios");

const addinfo = async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(
      "http://localhost:8000/api/addPatientInfo",
      data
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

const getPatientInfo = async (req, res) => {
  const userId = req.params.userid;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getPatientInfo/${userId}`
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
module.exports = { addinfo, getPatientInfo };
