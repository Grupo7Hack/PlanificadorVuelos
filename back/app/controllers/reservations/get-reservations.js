"use strict";

const {
  getReservations,
} = require("../../repositories/reservations-repository");

async function getUserReservations(req, res) {
  try {
    const userId = req.params.id;
    const reservations = await getReservations(userId);

    res.status(200).send(reservations);
  } catch (err) {
    res.status(400);
    res.send({ err: err.message });
  }
}

module.exports = getUserReservations;
