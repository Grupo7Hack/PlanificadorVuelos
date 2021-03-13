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
  nombre: Joi.string().min(3).max(20).optional(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(20),
  repeatPassword: Joi.ref("password"),
});

async function patchUser(req, res) {
  try {
    const { id } = req.body;
    const idUser = parseInt(id);
    console.log(id);
    console.log("databody", req.body);

    await schemaId.validateAsync(idUser);

    const userExists = await findUserById(idUser);
    if (!userExists) {
      const error = new Error(`No existe un usuario con el ID: ${idUser}`);
      error.status = 400;
      throw error;
    }
    console.log("userExists", userExists);
    let dataUser = {
      ...userExists,
    };

    const nuevaData = {
      nombre: req.body.nombre,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
    };
    await schema.validateAsync(nuevaData);
    const { nombre, password, repeatPassword } = req.body;
    if (nombre) {
      dataUser = {
        ...dataUser,
        nombre: nombre,
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
    console.log("dataantesupdate", dataUser);
    await updateUserByPatch(idUser, dataUser);

    res.status(200).send({ idUser, ...dataUser });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = patchUser;
