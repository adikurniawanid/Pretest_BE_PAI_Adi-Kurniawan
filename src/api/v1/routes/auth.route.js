"use strict";
const express = require("express");
const router = express.Router();
const { AuthController, UserController } = require("../controllers");
const { registerValidationRules } = require("../validations/user.validation");
const { loginValidationRules } = require("../validations/auth.validation");
const { validation } = require("../middlewares");

router.post(
  "/register",
  registerValidationRules(),
  validation,
  UserController.register
);

router.post("/login", loginValidationRules(), validation, AuthController.login);

module.exports = router;
