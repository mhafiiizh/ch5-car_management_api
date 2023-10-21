"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.Admin, {
        foreignKey: {
          name: "createdBy",
        },
      });
      Car.belongsTo(models.Admin, {
        foreignKey: {
          name: "updatedBy",
        },
      });
      Car.belongsTo(models.Admin, {
        foreignKey: {
          name: "deletedBy",
        },
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      year: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      image: DataTypes.TEXT,
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Car",
    }
  );
  return Car;
};
