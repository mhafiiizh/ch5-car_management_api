const { Car } = require("../models");

const create = async (createArgs) => {
  try {
    return await Car.create(createArgs);
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateArgs) => {
  try {
    return await Car.update(updateArgs, {
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteData = async (id) => {
  try {
    return await Car.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const findById = async (id) => {
  try {
    return await Car.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const findAll = async (queryOptions) => {
  try {
    return await Car.findAll({ where: queryOptions });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  update,
  deleteData,
  findById,
  findAll,
};
