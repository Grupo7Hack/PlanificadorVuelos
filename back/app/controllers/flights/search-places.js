"use strict";

const { findPlaces } = require("../../repositories/flights-repository");

async function searchPlaces(req, res) {
  try {
    const { name } = req.params;
    const places = await findPlaces(name);

    if (!places) {
      throw new Error(
        "Ninguna localización coincide con los criterios de búsqueda"
      );
    }

    res.status(200).send(places);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = searchPlaces;
