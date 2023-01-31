"use strict";
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../../../config/jwt.config");

const { TokenExpiredError } = jwt;

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw {
        status: 403,
        message: "No token provided!",
      };
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const publicId = decoded.publicId;
    const email = decoded.email;
    const selectedUser = await User.findOne({
      attributes: ["id"],
      where: {
        publicId,
        email,
      },
    });

    if (selectedUser) {
      req.user = selectedUser;
      next();
    } else {
      throw {
        status: 401,
        message: "Unauthorized User",
      };
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized! Access Token was expired!",
      });
    }

    next(error);
  }
};
