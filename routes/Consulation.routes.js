const Router = require("express").Router();
const {
  createConsultation,
} = require("../controllers/Consultation.controller");

Router.post("/create", createConsultation);

module.exports = Router;
