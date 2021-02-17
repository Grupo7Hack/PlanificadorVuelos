"use strict";

const { findAllPlaces } = require("../../repositories/flights-repository");

async function getAllPlaces(req, res) {
  try {
    const places = await findAllPlaces();

    res.status(200).send(places);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getAllPlaces;
