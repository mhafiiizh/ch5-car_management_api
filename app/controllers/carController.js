const { where } = require("sequelize");
const carService = require("../services/carService");
const ApiError = require("../utils/apiError");

const createCar = async (req, res, next) => {
  const { name, brand, year, price, isAvailable } = req.body;
  try {
    if (!name && !brand && !year && !price && !isAvailable) {
      return next(
        new ApiError("Name, Brand, Year, Price, isAvailable are required!", 400)
      );
    }

    const newCar = await carService.createCar({
      name,
      brand,
      year,
      price,
      isAvailable,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        newCar,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  const { name, brand, year, price, isAvailable } = req.body;
  try {
    const adminId = req.params.id;
    if (!adminId) {
      next(new ApiError("ID not found!", 404));
    }
    if (!name && !brand && !year && !price && !isAvailable) {
      next(
        new ApiError("Name, Brand, Year, Price, isAvailable are required!", 400)
      );
    }

    await carService.updateCar(
      {
        name,
        brand,
        year,
        price,
        isAvailable,
        updatedBy: adminId,
      },
      {
        where: {
          id: adminId,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Car updated",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    if (!adminId) {
      next(new ApiError("ID not found!", 404));
    }

    await carService.deleteCar({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Car deleted",
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    if (!adminId) {
      next(new ApiError("ID not found!", 404));
    }

    const car = await carService.findCarById({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findAllCars = async (req, res, next) => {
  try {
    const cars = await carService.findAllCars();
    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

module.exports = {
  createCar,
  updateCar,
  deleteCar,
  findCarById,
  findAllCars,
};
