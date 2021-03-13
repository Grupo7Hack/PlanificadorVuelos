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
  nombre: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUser(req, res) {
  try {
    const { id } = req.params;

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
    }

    let currentPassword = userExists["contraseña"];

    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      currentPassword = passwordHash;
    }

    await udpateDataUser({
      id,
      nombre: name,
      email,
      contraseña: currentPassword,
    });

    res.send({ id, name, email, role: userExists.role });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = updateUser;
