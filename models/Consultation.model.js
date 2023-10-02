const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db");
class Consultation extends Model {}

Consultation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { modelName: "Consultation", sequelize }
);

module.exports = Consultation;
