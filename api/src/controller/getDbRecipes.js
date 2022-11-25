const { Recipe, Type } = require("../db.js")

const getDbRecipes = async () => {
    try {
        
        return await Recipe.findAll({
            include: {
                model: Type,
                attributes:["name"],
                through: {
                    attributes: []
                }
            }
        }) 

        // const allDbRecipes = await allInDb.map(recipe => {
        //     const allTypes = recipe.Types?.map(type => type.name);
        //     return {
        //         id: recipe.id,
        //         title: recipe.title,
        //         summary: recipe.summary,
        //         healthScore: recipe.healthScore,
        //         stepByStep: recipe.stepByStep,
        //         image: recipe.image,
        //         diets: allTypes
            // }
        // })

        // return allDbRecipes

    } catch (error) {
        
        console.log(error)
    
    }
}

module.exports = getDbRecipes