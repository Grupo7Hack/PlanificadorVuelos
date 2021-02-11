"use strict";

const express = require("express");
const getClasses = require("../controllers/flights/get-classes");
const getPassengers = require("../controllers/flights/get-passengers");
const getFlights = require("../controllers/flights/get-flights");
const getAllPlaces = require("../controllers/flights/get-all-places");
const searchPlaces = require("../controllers/flights/search-places");

//Todas las rutas son públicas en ppio
// const validateAuth = require("../middlewares/validate-auth");

const router = express.Router();

router.route("/classes").get((req, res) => getClasses(req, res));
router.route("/places").get((req, res) => getAllPlaces(req, res));
router.route("/places/:name").get((req, res) => searchPlaces(req, res));
router.route("/passengers").get((req, res) => getPassengers(req, res));
router
  .route("/:origen/:destino/:fechaIda")
  .get((req, res) => getFlights(req, res));

module.exports = router;
