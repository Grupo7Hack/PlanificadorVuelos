"use strict";
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function logout(req, res) {
  try {
    const token = "";
    const jwtTokenExpiryTime = "";
    const response = { accessToken: token, expiresIn: jwtTokenExpiryTime };
    res.send(response);
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports = logout;
