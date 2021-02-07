"use strict";

const Joi = require("joi");
const {
  deleteDataUser,
  findUserById,
} = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteUser(req, res) {
  try {
    if (!req.auth.role === "admin") {
      const error = new Error("No tienes permiso para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const { id } = req.params;

    await schema.validateAsync(id);

    const userExists = await findUserById(id);
    if (!userExists) {
      const error = new Error("Usuario no existe");
      error.status = 400;
      throw error;
    }
    const userDeleted = await deleteDataUser(id);

    res.status(204).send();
  } catch (err) {
    res.status(err.status).send({ error: err.message });
  }
}

module.exports = deleteUser;
