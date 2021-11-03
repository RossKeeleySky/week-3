// get the seq package
const { Sequelize, DataTypes } = require('sequelize');

// model = outline of the data we'll store against an entity
const restaurantModel = {
  name: {
    type: Sequelize.STRING, // TEXT in sqlite
    allowNull: false,
    validate: { max: 50 }
  },
  imagelink: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isUrl: true }
  },
};

const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT, // may end up as "REAL" in sqlite
    allowNull: false,
    validate: { isFloat: true }
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };
