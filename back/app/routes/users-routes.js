"use strict";

const express = require("express");
const registerUsers = require("../controllers/register-users");
const login = require("../controllers/login-user");
const activateCodeUser = require("../controllers/activate-users");
const router = express.Router();

//api/v1/users
router.route("/register").post((req, res) => registerUsers(req, res));

router.route("/login").post((req, res) => login(req, res));

router.route("/activation").get((req, res) => activateCodeUser(req, res));

module.exports = router;
