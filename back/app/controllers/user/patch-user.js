"use strict";
const bcrypt = require("bcryptjs");
const { async } = require("crypto-random-string");
const cryptoRandomString = require("crypto-random-string");
const Joi = require("joi");

const {
  findUserById,
  updateUserByPatch,
  findUserByEmail,
} = require("../../repositories/users-repository");

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(20).optional(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20),
  repeatPassword: Joi.ref("password"),
});

async function patchUser(req, res) {
  try {
    const { id } = req.params;
    const idUser = parseInt(id);

    await schemaId.validateAsync(idUser);

    const userExists = await findUserById(idUser);
    if (!userExists) {
      const error = new Error(`No existe un usuario con el ID: ${idUser}`);
      error.status = 400;
      throw error;
    }
    let dataUser = {
      ...userExists,
    };

    await schema.validateAsync(req.body);
    const { name, password, repeatPassword } = req.body;
    if (name) {
      dataUser = {
        ...dataUser,
        nombre: name,
      };
    }

    let currentPassword = userExists["contraseña"];

    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      currentPassword = passwordHash;

      dataUser = {
        ...dataUser,
        contraseña: currentPassword,
      };
    }
    await updateUserByPatch(idUser, dataUser);

    res.status(200).send({ idUser, ...dataUser });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = patchUser;
