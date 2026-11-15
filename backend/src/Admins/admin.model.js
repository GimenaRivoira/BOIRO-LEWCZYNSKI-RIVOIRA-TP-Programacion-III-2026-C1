const { INTEGER, STRING, DATE } = require("sequelize");
const sequelize = require("../database/sequelize");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamps: true,
  },
);
module.exports = Admin;
