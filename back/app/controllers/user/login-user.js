"use strict";
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
});

async function login(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const existUser = await findUserByEmail(email);
    if (!existUser) {
      const error = new Error("No existe un usuario con ese email");
      res.status(401);
      throw error;
    }

    const validPassword = await bcrypt.compare(password, existUser.contraseña);
    if (!validPassword) {
      const error = new Error("El campo password no es correcto");
      res.status(401);
      throw error;
    }

    const jwtTokenExpiryTime = "30m";

    const { id, nombre, role } = existUser;
    const payload = { id, nombre, email, role };

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtTokenExpiryTime,
    });

    const response = { accessToken: token, expiresIn: jwtTokenExpiryTime };

    res.send(response);
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
}

module.exports = login;
