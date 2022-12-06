const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "There's no title"
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "There's no summary"
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    stepByStep: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["There's no steps"]
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://static.vecteezy.com/system/resources/previews/002/621/145/large_2x/chef-kitchen-restaurant-catering-food-line-style-icon-free-vector.jpg"
    },
    dishTypes: {
      type: DataTypes.STRING
    }
  });
};
