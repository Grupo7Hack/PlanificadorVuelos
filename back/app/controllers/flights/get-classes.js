"use strict";

const { getClasses } = require("../../repositories/flights-repository");

async function getClasses(req, res) {
  try {
    const classes = await getClasses();

    res.status(200).send(classes);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getClasses;
