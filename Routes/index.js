const express = require("express");
const Router = express.Router();
const { signin, signup } = require("../Controller/User");
const { addinfo, getPatientInfo } = require("../Controller/Patient");
const { getStates, getCity } = require("../Controller/State_City_Zip");
const {
  practicelocation,
} = require("../Controller/PracticeLocationController");
const { getCategory } = require("../Controller/Category");
const { getPurposeOfVisit } = require("../Controller/PurposeOfVisit");
const { getCaseType } = require("../Controller/Case_TypeController");
const { getFirm, getInsurance } = require("../Controller/FirmController");
const { addCase, getCases } = require("../Controller/CaseController");
const {
  addDoctor,
  getDoctorForPracticeLocationAndSpeciality,
} = require("../Controller/DoctorController");
const { getSpeciality } = require("../Controller/DoctorSpeciality");
const { getAppointmentTypes } = require("../Controller/Appointment_types");
const {
  addAppointment,
  getAppointment,
} = require("../Controller/AppointmentController");
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
Router.get("/getInsurance", getInsurance);
Router.post("/addCase", addCase);
Router.get("/getSpeciality", getSpeciality);
Router.get("/getCases/:PID", getCases);
Router.get("/getAppointmentTypes", getAppointmentTypes);
Router.post("/addDoctorInfo", addDoctor);
Router.get(
  "/getDoctor/:practiceLocationId/:specialityId",
  getDoctorForPracticeLocationAndSpeciality
);
Router.post("/addAppointment", addAppointment);
Router.get("/getPatientInfo/:userid", getPatientInfo);
Router.get("/getAppointment/:CaseID", getAppointment);
module.exports = Router;
