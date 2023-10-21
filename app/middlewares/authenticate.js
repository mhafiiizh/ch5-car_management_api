const jwt = require("jsonwebtoken");
const { Admin, Member } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next(new ApiError("Token not found", 401));
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
        return next(new ApiError("Admin data not found", 404));
      }
    } else {
      const member = await Member.findByPk(payload.id);
      if (member) {
        req.user = member;
        next();
      } else {
        return next(new ApiError("Nenber data not found", 404));
      }
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
