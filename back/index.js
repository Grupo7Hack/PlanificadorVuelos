"use strict";

require("dotenv").config();

const express = require("express");
const flightsRouter = require("./app/routes/flights-routes");
const userRouter = require("./app/routes/users-routes");

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT || 3001;
app.use("/api/v1/flights/", flightsRouter);
app.use("/api/v1/users/", userRouter);

app.listen(port, () => console.log(`Listening ${port}...`));
