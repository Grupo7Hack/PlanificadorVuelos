"use strict";
const bcrypt = require("bcryptjs");
const { async } = require("crypto-random-string");
const cryptoRandomString = require("crypto-random-string");
const Joi = require("joi");

const {
  addCodeActivation,
  deletePreviousCodeActivation,
  findUserByEmail,
  findUserById,
  udpateDataUser,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  password: Joi.string(),
  repeatPassword: Joi.string(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUser(req, res) {
  try {
    const { id } = req.auth;

    await schema.validateAsync(req.body);
    const { name, email, password, repeatPassword } = req.body;

    const userExists = await findUserById(id);
    const userEmailExists = await findUserByEmail(email);

    if (userEmailExists && userEmailExists.id !== id) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    if (email !== userExists.email) {
      const codeActivation = cryptoRandomString({ length: 64 });
      // await sendEmailActivation(name, email, codeActivation);
      await deletePreviousCodeActivation(id);
      await addCodeActivation(id, codeActivation);
      console.log("se cambio el email");
    }

    let currentPassword = userExists.password;
    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      currentPassword = passwordHash;
      console.log("se cambio el password");
    }

    await udpateDataUser({ id, name, email, password: currentPassword });

    res.send({ id, name, email, role: userExists.role });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = updateUser;
