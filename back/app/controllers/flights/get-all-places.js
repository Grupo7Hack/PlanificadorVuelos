"use strict";

const { findAllPlaces } = require("../../repositories/flights-repository");

function getAllPlaces(req, res) {
  try {
    const places = findAllPlaces();

    res.status(200).send(places);
  } catch (err) {
    res.status(400);
    res.send({ err: err.message });
  }
}

module.exports = getAllPlaces;
