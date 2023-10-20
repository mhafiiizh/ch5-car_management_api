const jwt = require("jsonwebtoken");
const { Admin, Member } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(new ApiError("Token tidak ditemukan", 401));
    }

    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (
      payload.role &&
      (payload.role === "Superadmin" || payload.role === "Admin")
    ) {
      const admin = await Admin.findByPk(payload.id);
      if (admin) {
        req.user = admin;
        next();
      } else {
        next(new ApiError("Data admin tidak ditemukan", 404));
      }
    } else {
      const member = await Member.findByPk(payload.id);
      if (member) {
        req.user = member;
        next();
      } else {
        next(new ApiError("Data member tidak ditemukan", 404));
      }
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
