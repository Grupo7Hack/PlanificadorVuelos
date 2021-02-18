"use strict";

require("dotenv").config();

const express = require("express");
const flightsRouter = require("./app/routes/flights-routes");
const fileUpload = require("express-fileupload");
const userRouter = require("./app/routes/users-routes");
const reservationRouter = require("./app/routes/reservations-routes");

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

const port = process.env.SERVER_PORT || 3001;
app.use("/api/v1/flights/", flightsRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/reservation/", reservationRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
