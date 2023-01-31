"use strict";
const crypto = require("crypto");
const { User } = require("../models");
const { generateJWT, hashPassword } = require("../helpers");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({
        publicId: crypto.randomUUID(),
        name,
        email,
        password: await hashPassword(password),
      });

      const token = await generateJWT(user.id, user.publicId, user.email);

      res.status(201).json({
        message: "User created successfully",
        data: {
          publicId: user.publicId,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
};
