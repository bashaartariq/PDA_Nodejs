const express = require("express");
const { authenticate } = require("../Authentication/authenticate");
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
const {
  addCase,
  getCases,
  updateCase,
} = require("../Controller/CaseController");
const {
  addDoctor,
  getDoctorForPracticeLocationAndSpeciality,
  getAppointmentsForDoctor,
} = require("../Controller/DoctorController");
const { getSpeciality } = require("../Controller/DoctorSpeciality");
const { getAppointmentTypes } = require("../Controller/Appointment_types");
const {
  addAppointment,
  getAppointment,
  updateAppointment,
} = require("../Controller/AppointmentController");
Router.post("/signin", signin);
Router.post("/signup", signup);
Router.post("/addPatientInfo", authenticate, addinfo);
Router.get("/getStates", authenticate, getStates);
Router.get("/getCity/:state", authenticate, getCity);
Router.get("/getPracticeLocation", authenticate, practicelocation);
Router.get("/getCategory", authenticate, getCategory);
Router.get("/getPurposeOfVisit", authenticate, getPurposeOfVisit);
Router.get("/getCaseType", authenticate, getCaseType);
Router.get("/getFirm", authenticate, getFirm);
Router.get("/getInsurance", authenticate, getInsurance);
Router.post("/addCase", authenticate, addCase);
Router.get("/getSpeciality", authenticate, getSpeciality);
Router.get("/getCases/:PID", authenticate, getCases);
Router.get("/getAppointmentTypes", authenticate, getAppointmentTypes);
Router.post("/addDoctorInfo", authenticate, addDoctor);
Router.get(
  "/getDoctor/:practiceLocationId/:specialityId",
  authenticate,
  getDoctorForPracticeLocationAndSpeciality
);
Router.post("/addAppointment", authenticate, addAppointment);
Router.get("/getPatientInfo/:userid", authenticate, getPatientInfo);
Router.get("/getAppointment/:CaseID", authenticate, getAppointment);
Router.put("/updateCase/:caseId", authenticate, updateCase);
Router.put(
  "/updateAppointment/:appointment_id",
  authenticate,
  updateAppointment
);
Router.get(
  "/getAppointmentsForDoctor/:doctorId",
  authenticate,
  getAppointmentsForDoctor
);

module.exports = Router;
