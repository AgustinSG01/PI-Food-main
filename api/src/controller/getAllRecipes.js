const getDbRecipes = require("./getDbRecipes.js")
const getApiRecipes = require("./getApiRecipes.js")

const getAllRecipes = async () => {
    const apiRecipes = await getApiRecipes()
    const dbRecipes = await getDbRecipes()
    const allRecipes = dbRecipes.concat(apiRecipes)
    return allRecipes
}

module.exports = getAllRecipes