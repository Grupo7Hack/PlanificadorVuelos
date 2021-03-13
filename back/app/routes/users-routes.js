"use strict";

const express = require("express");
const registerUsers = require("../controllers/user/register-users");
const login = require("../controllers/user/login-user");

const logout = require("../controllers/user/logout-user");
const activateCodeUser = require("../controllers/user/activate-users");
const updateUser = require("../controllers/user/update-user");
const patchUser = require("../controllers/user/patch-user");
const deleteUser = require("../controllers/user/delete-user");
const uploadImage = require("../controllers/user/upload-image-user");

const validateAuth = require("../middlewares/validate-authorization");
const getUserProfile = require("../controllers/user/get-user-profile");

const router = express.Router();

//api/v1/users
router.route("/register").post((req, res) => registerUsers(req, res));
router.route("/login").post((req, res) => login(req, res));
router.route("/logout").post((req, res) => logout(req, res));

router.route("/activation").get((req, res) => activateCodeUser(req, res));

//api/v1/users/:id
router
  .route("/:id")
  .all(validateAuth)
  .get((req, res) => getUserProfile(req, res))
  .put((req, res) => updateUser(req, res))
  .patch((req, res) => patchUser(req, res))
  .delete((req, res) => deleteUser(req, res));

//api/v1/users/upload
router
  .route("/upload")
  .all(validateAuth)
  .post((req, res) => uploadImage(req, res));

module.exports = router;
