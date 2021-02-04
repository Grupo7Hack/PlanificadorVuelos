"use strict";

const Joi = require("joi");
const { findUserByEmail } = require("../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
  repeatPassword: Joi.ref("password"),
});
