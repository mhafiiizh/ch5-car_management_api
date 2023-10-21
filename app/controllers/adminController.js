const bcrypt = require("bcrypt");
const adminService = require("../services/adminService");
const { Admin } = require("../models");
const ApiError = require("../utils/apiError");

const createAdmin = async (req, res, next) => {
  const { name, age, address, role, email, password, confirmPassword } =
    req.body;
  try {
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!name && !age && !address && !role && !email && !password) {
      return next(
        new ApiError(
          "Name, Age, Address, Role, Email, Password are required!",
          400
        )
      );
    }

    if (admin) {
      return next(new ApiError("Email has already taken", 400));
    }

    const passwordLength = password.length < 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 characters", 400));
    }

    if (password !== confirmPassword) {
      return next(new ApiError("Password does not match", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newAdmin = await adminService.createAdmin({
      name,
      age,
      address,
      role,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        newAdmin,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const findAllAdmins = async (req, res, next) => {
  try {
    const admins = await adminService.findAllAdmins();

    if (admins.length === 0) {
      return next(new ApiError("You don't have any data", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        admins,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findAdminById = async (req, res, next) => {
  const adminId = req.params.id;
  try {
    if (!adminId) {
      next(new ApiError("ID Not Found", 400));
    }
    const admin = await adminService.findAdminById(adminId);

    res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteAdmin = async (req, res, next) => {
  const adminId = req.params.id;
  try {
    if (!adminId) {
      next(new ApiError("ID Not Found", 400));
    }
    const admin = await adminService.deleteAdmin(adminId);

    res.status(200).json({
      status: "success",
      message: "Data has already deleted",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const updateAdmin = async (req, res, next) => {
  const { name, age, address, role } = req.body;
  const adminId = req.params.id;
  try {
    if (!adminId) {
      next(new ApiError("ID Not Found", 400));
    }
    const admin = await adminService.updateAdmin(adminId, {
      name,
      age,
      address,
      role,
    });

    res.status(200).json({
      status: "success",
      message: "Data Updated",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

module.exports = {
  createAdmin,
  findAllAdmins,
  findAdminById,
  deleteAdmin,
  updateAdmin,
};
