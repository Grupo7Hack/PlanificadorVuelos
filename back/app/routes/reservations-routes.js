"use strict";

const express = require("express");
const createReservation = require("../controllers/reservations/create-reservation");
const getUserReservations = require("../controllers/reservations/get-reservations");
const validateAuth = require("../middlewares/validate-authorization");

const router = express.Router();

//api/v1/reservation
router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createReservation(req, res));
router.route("/:id").get((req, res) => getUserReservations(req, res));

module.exports = router;
