require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Routes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(3000, () => {
    console.log("This app is listening on port 3000");
});
