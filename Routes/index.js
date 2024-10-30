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
const { allowRoles } = require("../Authorization/checkRole");
Router.post("/signin", signin);
Router.post("/signup", signup);
Router.post(
  "/addPatientInfo",
  authenticate,
  allowRoles(["admin", "patient"]),
  addinfo
);
Router.get(
  "/getStates",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getStates
);
Router.get(
  "/getCity/:state",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getCity
);
Router.get(
  "/getPracticeLocation",
  practicelocation
);
Router.get(
  "/getCategory",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getCategory
);
Router.get(
  "/getPurposeOfVisit",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getPurposeOfVisit
);
Router.get(
  "/getCaseType",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getCaseType
);
Router.get(
  "/getFirm",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getFirm
);
Router.get(
  "/getInsurance",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getInsurance
);

Router.post("/addCase", authenticate, allowRoles(["patient"]), addCase);
Router.get(
  "/getSpeciality",
  getSpeciality
);
Router.get(
  "/getCases/:PID",
  authenticate,
  allowRoles(["admin", "patient"]),
  getCases
);
Router.get(
  "/getAppointmentTypes",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getAppointmentTypes
);
Router.post("/addDoctorInfo", addDoctor);
Router.get(
  "/getDoctor/:practiceLocationId/:specialityId",
  getDoctorForPracticeLocationAndSpeciality
);
Router.post(
  "/addAppointment",
  authenticate,
  allowRoles(["admin", "patient"]),
  addAppointment
);
Router.get(
  "/getPatientInfo/:userid",
  authenticate,
  allowRoles(["admin", "patient"]),
  getPatientInfo
);
Router.get(
  "/getAppointment/:CaseID",
  authenticate,
  allowRoles(["admin", "patient"]),
  getAppointment
);
Router.put(
  "/updateCase/:caseId",
  authenticate,
  allowRoles(["admin", "patient"]),
  updateCase
);
Router.put(
  "/updateAppointment/:appointment_id",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  updateAppointment
);
Router.get(
  "/getAppointmentsForDoctor/:doctorId",
  authenticate,
  allowRoles(["admin", "doctor", "patient"]),
  getAppointmentsForDoctor
);

module.exports = Router;