const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Type", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.ENUM("gluten free",
            "ketogenic",
            "lacto ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "fodmap friendly",
            "whole 30",
            "dairy free",
            "vegetarian",
            "lacto vegetarian",
            "ovo vegetarian")
        }
    })
}