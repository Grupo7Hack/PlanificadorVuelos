"use strict";

const { validateCodeActivation } = require("../repositories/users-repository");
const Joi = require("joi");

const schema = Joi.string().min(64).max(64);

async function activateCodeUser(req, res) {
  try {
    const { code: code } = req.query;

    if (!code) {
      const error = new Error("Codigo de Activacion Invalido");
      error.status(400);
      throw error;
    }

    await schema.validateAsync(code);

    const itIsValid = await validateCodeActivation(code);
    if (!itIsValid) {
      res.send("Codigo no valido, su cuenta no fue activada");
    } else {
      res.send("Cuenta Activada");
    }
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = activateCodeUser;
