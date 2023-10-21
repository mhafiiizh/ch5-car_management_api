const carRepository = require("../repositories/carRepository");

const createCar = async (requestBody) => {
  try {
    return await carRepository.create(requestBody);
  } catch (error) {
    throw error;
  }
};

const updateCar = async (id, requestBody) => {
  try {
    return await carRepository.update(id, requestBody);
  } catch (error) {
    throw error;
  }
};

const deleteCar = async (id) => {
  try {
    return await carRepository.deleteData(id);
  } catch (error) {
    throw error;
  }
};

const findCarById = async (id) => {
  try {
    return await carRepository.findById(id);
  } catch (error) {
    throw error;
  }
};

const findAllCars = async (queryOptions) => {
  try {
    return await carRepository.findAll(queryOptions);
  } catch (error) {
    throw error;
  }
};

const showCarsToMember = async () => {
  try {
    return await carRepository.showToMember({
      where: {
        isAvailable: true,
      },
      attributes: ["name", "brand", "year", "price"],
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCar,
  updateCar,
  deleteCar,
  findCarById,
  findAllCars,
  showCarsToMember,
};
