"use strict";
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validateAuthorization(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      const error = new Error("Autorización requerida");
      res.status(401);
      throw error;
    }
    const accessToken = authorization.split(" ")[1];

    // const payload = jwt.verify(
    //   accessToken,
    //   JWT_SECRET,
    //   function (err, decoded) {
    //     if (err) {
    //       return res.json({ mensaje: "Token inválida" });
    //     } else {
    //       return decoded;
    //       next();
    //     }
    //   }
    // );

    const payload = jwt.verify(accessToken, JWT_SECRET);

    const { id, nombre, email, role } = payload;
    req.auth = { id, nombre, email, role };

    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = validateAuthorization;
