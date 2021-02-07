"use strict";

const express = require("express");
const getClasses = require("../controllers/flights/get-classes");
const getPassengers = require("../controllers/flights/get-passengers");
const getFlights = require("../controllers/flights/get-flights");
const getPlaces = require("../controllers/flights/get-places");

//Todas las rutas son públicas en ppio
// const validateAuth = require("../middlewares/validate-auth");

const router = express.Router();

router.route("/classes").get((req, res) => getClasses(req, res));
router.route("/places").get((req, res) => getPlaces(req, res));
router.route("/passengers").get((req, res) => getPassengers(req, res));
router.route("/flights").get((req, res) => getFlights(req, res));

module.exports = router;
