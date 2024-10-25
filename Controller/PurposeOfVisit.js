const axios = require("axios");
const getPurposeOfVisit = async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getPurposeOfVisit"
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

module.exports = { getPurposeOfVisit };
