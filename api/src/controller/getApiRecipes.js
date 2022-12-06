const { YOUR_API_KEY } = process.env
const axios = require("axios")
const e = require("express")
// await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)

const getApiRecipes = async () => {
    
    // let recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=10`)
    let recipesApi = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

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