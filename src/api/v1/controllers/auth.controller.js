("use strict");
const { User } = require("../models");
const { comparePassword, generateJWT } = require("../helpers");
module.exports = class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }

      const isVerifiedPassword = await comparePassword(password, user.password);

      if (!isVerifiedPassword) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }

      const token = await generateJWT(user.id, user.publicId, user.email);

      res.status(200).json({
        message: "Login sucessfully",
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
