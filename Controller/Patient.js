const axios = require('axios');

const addinfo = async(req,res)=>{
    const data = req.body;
    try {
        const response = await axios.post('http://localhost:8000/api/addPatientInfo',data);
        console.log('Data Retrived : ',response.data);
    }
    catch(error)
    {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }

}
module.exports = {addinfo};