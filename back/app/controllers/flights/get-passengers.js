"use strict";

const { findPassengers } = require("../../repositories/flights-repository");

async function getPassengers(req, res) {
  try {
    const passengers = await findPassengers();

    res.status(200).send(passengers);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getPassengers;
