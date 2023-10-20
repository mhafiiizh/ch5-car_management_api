const ApiError = require("../utils/apiError");

const checkSuperadmin = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== role) {
        new ApiError(`You are not Superadmin or Admin can't access it`, 401);
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkSuperadmin;
