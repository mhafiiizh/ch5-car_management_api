"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Car, {
        foreignKey: {
          name: "createdBy",
        },
      });
      Admin.hasMany(models.Car, {
        foreignKey: {
          name: "updatedBy",
        },
      });
      Admin.hasMany(models.Car, {
        foreignKey: {
          name: "deletedBy",
        },
      });
    }
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      role: DataTypes.ENUM("Superadmin", "Admin"),
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
