"use strict";

const express = require("express");
const createReservation = require("../controllers/reservations/create-reservation");
const validateAuth = require("../middlewares/validate-authorization");

const router = express.Router();

//api/v1/reservation
router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createReservation(req, res));

module.exports = router;
