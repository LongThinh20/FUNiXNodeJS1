const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Oder = sequelize.define("oder", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = Oder;
