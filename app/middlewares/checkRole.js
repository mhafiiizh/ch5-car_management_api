const ApiError = require("../utils/apiError");
const Admin = require("../models"); // Gantilah dengan model Anda

const checkRole = (role, role2) => {
  return async (req, res, next) => {
    try {
      if (req.user.role == role || req.user.role == role2) {
        next();
      } else {
        return next(
          new ApiError(`Cannot access because you are not admin part`, 401)
        );
      }
    } catch (err) {
      return next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
