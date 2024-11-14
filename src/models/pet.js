// models/pet.js
module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define('Pet', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      photo: {
        type: DataTypes.STRING,
      },
      lost: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Pet;
  };