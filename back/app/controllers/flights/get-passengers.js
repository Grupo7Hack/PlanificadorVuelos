"use strict";

const { getPassengers } = require("../../repositories/flights-repository");

async function getPassengers(req, res) {
  try {
    const passengers = await getPassengers();

    res.status(200).send(passengers);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getPassengers;
