const { YOUR_API_KEY } = process.env
const axios = require("axios")

const getApiRecipes = async () => {
    
    let recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)

    try {
    
    const allRecipesApi = await recipesApi.data.results?.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
            healthScore: recipe.healthScore,
            stepByStep: recipe.analyzedInstructions[0]?.steps.map(e => e.step),
            image: recipe.image,
            diets: recipe.diets,
            dishTypes: recipe.dishTypes
        }
    })
    
    return allRecipesApi

    } catch (error) {
        
        console.log(error)
    
    }
}

module.exports = getApiRecipes