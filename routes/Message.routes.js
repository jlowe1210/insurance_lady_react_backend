const Router = require("express").Router();
const { postMessage } = require("../controllers/Message.controller");

Router.post("/create", postMessage);

module.exports = Router;
