"use strict";
const { findUserById } = require("../../repositories/users-repository");

async function getUserProfile(req, res) {
  try {
    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;
    const userId = req.auth.id;

    const user = await findUserById(userId);

    const image = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${user.image}`;
    const { password, ...userInfo } = user;

    res.send({ ...userInfo, image });
  } catch (err) {
    res.status(400).send("error");
  }
}

module.exports = getUserProfile;
