const express = require('express');
const Router = express.Router();
const {signin, signup } = require('../Controller/User');
const {addinfo} =  require('../Controller/Patient');

Router.post('/signin',signin);
Router.post('/signup',signup);
Router.post('/addPatientInfo',addinfo);

module.exports = Router;