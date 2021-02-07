"use strict";

const express = require("express");
const registerUsers = require("../controllers/user/register-users");
const login = require("../controllers/user/login-user");
const activateCodeUser = require("../controllers/user/activate-users");
const router = express.Router();

//api/v1/users
router.route("/register").post((req, res) => registerUsers(req, res));

router.route("/login").post((req, res) => login(req, res));

router.route("/activation").get((req, res) => activateCodeUser(req, res));

//api/v1/users/:id
router
  .route("/:id")
  .put((req, res) => updateUser(req, res))
  .patch((req, res) => updateParameterUser(req, res))
  .delete((req, res) => deleteUser(req, res));

module.exports = router;
