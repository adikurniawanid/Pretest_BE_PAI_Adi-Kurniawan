const jwt = require("jsonwebtoken");
const { UserToken } = require("../models");
const config = require("../../../config/jwt.config");

module.exports = async (refreshToken) => {
  try {
    const userToken = await UserToken.findOne({
      where: { refreshToken },
    });

    if (!userToken) {
      throw {
        status: 401,
        message: "Invalid refresh token",
      };
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY);

    if (!decoded) {
      throw {
        status: 401,
        message: "Invalid refresh token",
      };
    }

    return {
      id: decoded.id,
      publicId: decoded.publicId,
      email: decoded.email,
    };
  } catch (error) {
    throw error;
  }
};
