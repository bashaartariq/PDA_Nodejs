const express = require("express");
const { authenticate } = require("../Authentication/authenticate");
const Router = express.Router();
const { signin, signup, getRoles, getGender } = require("../Controller/User");
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
  getApppointmentCase,
} = require("../Controller/DoctorController");
const { getSpeciality } = require("../Controller/DoctorSpeciality");
const { getAppointmentTypes } = require("../Controller/Appointment_types");
const {
  addAppointment,
  getAppointment,
  updateAppointment,
} = require("../Controller/AppointmentController");
const { allowRoles } = require("../Authorization/checkRole");
const {
  getDoctorPatientCount,
  getAllPatient,
  deletePatient,
  allDoctor,
  getAppointmentDoctor,
  GeneratePDF,
  getCasesofPatient,
  deleteDoctor,deleteCases,deleteAppointment,searchCases,searchAppointment
} = require("../Controller/Admin");
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
Router.get("/getPracticeLocation", practicelocation);
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
Router.get("/getSpeciality", getSpeciality);
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

Router.get(
  "/getAppointmentCase/:appointmentId",
  authenticate,
  allowRoles(["doctor", "admin"]),
  getApppointmentCase
);
Router.get("/Roles", getRoles);

Router.get("/Genders", getGender);
Router.get(
  "/doctorAndPatientCount",
  authenticate,
  allowRoles("admin"),
  getDoctorPatientCount
);
Router.get("/AllPatient", authenticate, allowRoles("admin"), getAllPatient);
Router.delete(
  "/Patients/:PatientIdsArr",
  authenticate,
  allowRoles("admin"),
  deletePatient
);

Router.get('/getCasesForAdmin/:patientId',authenticate,allowRoles('admin'),getCasesofPatient);
Router.get("/AllDoctors", authenticate, allowRoles("admin"), allDoctor);
Router.get("/DoctorAppointments/:id",authenticate,allowRoles("admin"),getAppointmentDoctor);
Router.post("/PDF", authenticate, allowRoles("admin"), GeneratePDF);
Router.delete('/Doctor/:id',authenticate,allowRoles("admin"),deleteDoctor);
Router.delete('/Case/:id',authenticate,allowRoles("admin"),deleteCases);
Router.delete('/Appointment/:id',authenticate,allowRoles("admin"),deleteAppointment);
Router.get('/searchCase/:type/:term/:patientId',authenticate,allowRoles(["admin","patient"]),searchCases);
Router.get('/searchAppointment/:type/:term/:patientId',authenticate,allowRoles(['admin','patient']),searchAppointment);
module.exports = Router;
