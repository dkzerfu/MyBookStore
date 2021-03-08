'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rental.init({
    renterId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    duedate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rental',
  });
  return rental;
};