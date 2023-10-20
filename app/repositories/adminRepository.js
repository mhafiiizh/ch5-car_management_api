const { Admin } = require("../models");

const create = async (createArgs) => {
  try {
    return await Admin.create(createArgs);
  } catch (error) {
    throw error;
  }
};

const update = async (id, updateArgs) => {
  try {
    return await Admin.update(updateArgs, {
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
    return await Admin.destroy({
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
    return await Admin.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    return await Admin.findAll({
      attributes: [
        "id",
        "name",
        "age",
        "address",
        "role",
        "email",
        "password",
        "createdAt",
        "updatedAt",
      ],
    });
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
