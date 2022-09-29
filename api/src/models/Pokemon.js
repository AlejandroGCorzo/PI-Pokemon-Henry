const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0 },
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0, max: 160 },
      },
      special_attack: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0, max: 160 },
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0, max: 160 },
      },
      special_defense: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0, max: 160 },
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: undefined,
        validate: { min: 0, max: 160 },
      },
      height: { type: DataTypes.FLOAT, defaultValue: null },
      weight: { type: DataTypes.FLOAT, defaultValue: null },
      img: {
        type: DataTypes.STRING,
        defaultValue:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png',
        allowNull: false,
      },
      moves: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
};
