"use strict";
const crypto = require("crypto");
const { User } = require("../models");
const { generateJWT } = require("../helpers");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({
        publicId: crypto.randomUUID(),
        name,
        email,
        password,
      });

      const token = await generateJWT(user.id, user.publicId, user.email);

      res.status(201).json({
        message: {
          en: "User created successfully",
          id: "Pengguna berhasil dibuat",
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
};
