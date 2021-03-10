"use strict";

const express = require("express");
const getFlights = require("../controllers/flights/get-flights");
const getOutboundFlights = require("../controllers/flights/get-outbound-flights");
const getAllPlaces = require("../controllers/flights/get-all-places");
const searchPlaces = require("../controllers/flights/search-places");

const router = express.Router();

router.route("/places").get((req, res) => getAllPlaces(req, res));
router.route("/places/:name").get((req, res) => searchPlaces(req, res));
router.route("/passengers").get((req, res) => getPassengers(req, res));
router
  .route("/:origen/:destino/:fechaIda")
  .get((req, res) => getFlights(req, res));
router
  .route(
    "/:cabinclass/:origin/:destination/:outboundDate/:inboundDate/:adults/:children/:infants/:maxStops"
  )
  .post((req, res) => getOutboundFlights(req, res));

module.exports = router;
