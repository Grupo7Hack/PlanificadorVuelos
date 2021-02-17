"use strict";

const { findClasses } = require("../../repositories/flights-repository");

async function getClasses(req, res) {
  try {
    const classes = await findClasses();

    res.status(200).send(classes);
  } catch (err) {
    res.status(err.status);
    res.send({ err: err.message });
  }
}

module.exports = getClasses;
