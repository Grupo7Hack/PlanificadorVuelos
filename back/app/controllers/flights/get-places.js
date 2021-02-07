"use strict";

const { getPlaces } = require("../../repositories/flights-repository");

async function getPlaces(req, res) {
  try {
    const places = await getPlaces();

    res.status(200).send(places);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getPlaces;
