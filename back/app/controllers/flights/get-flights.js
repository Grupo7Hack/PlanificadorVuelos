"use strict";

const { getFlights } = require("../../repositories/flights-repository");

async function getFlights(req, res) {
  try {
    const flights = await getFlights();

    res.status(200).send(flights);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getFlights;
