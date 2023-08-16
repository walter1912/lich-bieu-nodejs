const express = require("express");
const { getPagination } = require("../controllers/questionController");

const routes = express.Router();

routes.route("/pages/:pageInt").post(getPagination);

module.exports = routes;
