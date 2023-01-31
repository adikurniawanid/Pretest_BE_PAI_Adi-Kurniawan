"use strict";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { AuthRouters, FarmRouters } = require("./api/v1/routes");
const { errorHandler } = require("./api/v1/middlewares");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

const API_VERSION = "v1";

app.use(`/${API_VERSION}/auth`, AuthRouters);
app.use(`/${API_VERSION}/farm`, FarmRouters);
app.use(errorHandler);

module.exports = app;
