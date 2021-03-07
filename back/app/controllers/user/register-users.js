"use strict";
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const Joi = require("joi");
const { sendEmailActivation } = require("../../helpers/mail-smtp");

const {
  addCodeActivation,
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
  repeatPassword: Joi.ref("password"),
});

async function registerUsers(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { name, email, password } = req.body;

    const existEmail = await findUserByEmail(email);
    if (existEmail) {
      const error = new Error(`Ya existe un usuario con el email ${email}`);
      res.status(409);
      throw error;
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const id = await createUser(name, email, passwordHash, "foto", "user");

    const codeActivation = cryptoRandomString({ length: 64 });
    // await sendEmailActivation(name, email, codeActivation);
    await addCodeActivation(id, codeActivation);

    res.status(201).send({ id: id, name, email });
  } catch (err) {
    res.status(409).send({ error: err.message });
  }
}

module.exports = registerUsers;
