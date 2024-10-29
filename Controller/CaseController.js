const axios = require("axios");
const addCase = async (req, res) => {
  console.log("working");
  console.log(req.body);

  const data = req.body;
  try {
    const response = await axios.post(
      "http://localhost:8000/api/addCase",
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

const getCases = async (req, res) => {
  console.log("working");
  console.log(req.body);

  try {
    const pid = req.params.PID;
    const response = await axios.get(
      `http://localhost:8000/api/getCase/${pid}`
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


const updateCase = async (req, res) => {
  try {
    const caseId = req.params.caseId;
    const data = req.body;
    const response = await axios.put(
      `http://localhost:8000/api/updateCase/${caseId}`,data
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


module.exports = { addCase, getCases,updateCase };
