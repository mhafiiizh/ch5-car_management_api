const { Op } = require("sequelize");
const { Car } = require("../models");

const carService = require("../services/carService");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const createCar = async (req, res, next) => {
  const { name, brand, year, price, isAvailable } = req.body;
  const file = req.file;
  let img;
  try {
    if (!name && !brand && !year && !price && !file && !isAvailable) {
      return next(
        new ApiError(
          "Name, Brand, Year, Price, Image, isAvailable are required!",
          400
        )
      );
    }

    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newCar = await carService.createCar({
      name,
      brand,
      year,
      price,
      image: img,
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
  const file = req.file;
  let img;
  try {
    const carId = req.params.id;
    if (!carId) {
      return next(new ApiError("ID not found!", 404));
    }
    if (!name && !brand && !year && !price && !file && !isAvailable) {
      return next(
        new ApiError(
          "Name, Brand, Year, Price, Image, isAvailable are required!",
          400
        )
      );
    }

    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    await carService.updateCar(carId, {
      name,
      brand,
      year,
      price,
      imageUrl: img,
      isAvailable,
      updatedBy: req.user.id,
    });

    res.status(200).json({
      status: "success",
      message: "Car updated",
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    if (!carId) {
      return next(new ApiError("ID not found!", 404));
    }

    await carService.deleteCar(carId);

    await carService.updateCar(carId, {
      deletedBy: req.user.id,
    });

    res.status(200).json({
      status: "success",
      message: "Car deleted",
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const carId = req.params.id;
    if (!carId) {
      return next(new ApiError("ID not found!", 404));
    }

    const car = await carService.findCarById(carId);

    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const findAllCars = async (req, res, next) => {
  try {
    const { name, brand, year, price, isAvailable } = req.query;
    const queryOptions = {};

    if (name) queryOptions.name = { [Op.iLike]: `%${name}%` };
    if (brand) queryOptions.brand = { [Op.iLike]: `%${brand}%` };
    if (year) queryOptions.year = year;
    if (price) queryOptions.price = price;
    if (isAvailable === "true") {
      queryOptions.isAvailable = true;
    } else if (isAvailable === "false") {
      queryOptions.isAvailable = false;
    }

    const cars = await carService.findAllCars(queryOptions);

    if (cars.length === 0) {
      return next(new ApiError("You don't have any data", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const showCarsForMember = async (req, res, next) => {
  try {
    const cars = await carService.showCarsToMember();

    if (cars.length === 0) {
      return next(new ApiError("You don't have any data", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

module.exports = {
  createCar,
  updateCar,
  deleteCar,
  findCarById,
  findAllCars,
  showCarsForMember,
};
