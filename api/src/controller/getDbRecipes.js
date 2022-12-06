const { Recipe, Type } = require("../db.js")

const getDbRecipes = async () => {
    try {
        
        const recipes = await Recipe.findAll({
            include: {
                model: Type,
                attributes:["name"],
                through: {
                    attributes: []
                }
            }
        }) 
        return recipes.map(e => {
            return {
                id: e.id,
                title: e.title,
                summary: e.summary,
                healthScore: e.healthScore,
                stepByStep: e.stepByStep,
                image: e.image,
                diets: e.Types.map(e => e.name),  
                dishTypes: e.dishTypes
            }
        })
        // return recipes
    } catch (error) {
        
        console.log(error)
    
    }
}

module.exports = getDbRecipes