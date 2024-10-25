const express = require("express");
const Router = express.Router();
const { signin, signup } = require("../Controller/User");
const { addinfo } = require("../Controller/Patient");
const { getStates, getCity } = require("../Controller/State_City_Zip");
const {
  practicelocation,
} = require("../Controller/PracticeLocationController");
const { getCategory } = require("../Controller/Category");
const { getPurposeOfVisit } = require("../Controller/PurposeOfVisit");
const { getCaseType } = require("../Controller/Case_TypeController");
const { getFirm, getInsurance } = require("../Controller/FirmController");
const { addCase } = require("../Controller/CaseController");

Router.post("/signin", signin);
Router.post("/signup", signup);
Router.post("/addPatientInfo", addinfo);

Router.get("/getStates", getStates);
Router.get("/getCity/:state", getCity);
Router.get("/getPracticeLocation", practicelocation);
Router.get("/getCategory", getCategory);

Router.get("/getPurposeOfVisit", getPurposeOfVisit);
Router.get("/getCaseType", getCaseType);

Router.get("/getFirm", getFirm);

Router.get("/getInsurance/:firm", getInsurance);

Router.post("/addCase", addCase);
module.exports = Router;
