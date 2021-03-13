"use strict";

const { response } = require("express");
const {
  findOutboundFlights,
} = require("../../repositories/flights-repository");

async function getFlights(req, res) {
  try {
    const {
      cabinclass,
      origin,
      destination,
      outboundDate,
      inboundDate,
      adults,
      children,
      infants,
      maxStops,
    } = req.params;

    const flights = await findOutboundFlights(
      cabinclass,
      origin,
      destination,
      outboundDate,
      inboundDate,
      adults,
      children,
      infants,
      maxStops
    ).then(response);

    res.status(200).send(flights);
  } catch (err) {
    res.status(400);
    res.send({ err: err.message });
  }
}

module.exports = getFlights;
