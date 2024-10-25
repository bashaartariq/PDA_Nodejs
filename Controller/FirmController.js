const axios = require("axios");
const getFirm = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/api/getFirm");
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

const getInsurance = async (req, res) => {
  console.log("Working");

  const firm = req.params.firm;
  console.log(firm);
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getInsurance/${firm}`
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
module.exports = { getFirm, getInsurance };
