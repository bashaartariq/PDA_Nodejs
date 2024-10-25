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

module.exports = { addCase };
