const ApiError = require("../utils/apiError");

const checkRole = () => {
  return async (req, res, next) => {
    try {
      if (req.admin.role == "Superadmin" || req.admin.role == "Admin") {
        next();
      } else {
        next(
          new ApiError(`You are not Superadmin or Admin can't access it`, 401)
        );
      }
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
