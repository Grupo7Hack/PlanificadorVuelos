"use strict";

const { response } = require("express");
const { findFlights } = require("../../repositories/flights-repository");

async function getFlights(req, res) {
  try {
    const { origen, destino, fechaIda } = req.params;

    const flights = await findFlights(origen, destino, fechaIda).then(response);

    res.status(200).send(flights);
  } catch (err) {
    res.status(400);
    res.send({ err: err.message });
  }
}

module.exports = getFlights;
