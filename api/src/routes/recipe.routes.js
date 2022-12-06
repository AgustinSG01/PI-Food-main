const { Router } = require("express");
const { Recipe, Type } = require("../db.js")
const getAllRecipes = require("../controller/getAllRecipes.js");
const router = Router()

const dietsLocal =  [
    "gluten free",
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
    "ovo vegetarian"                        
];

router.get("/recipes", async(req, res) => {
    const { title } = req.query
    const allRecipes = await getAllRecipes()
try {
    if (title) {
        const titleRecipes = allRecipes.filter(recipe => recipe.title.toLowerCase().includes(title.toLowerCase())) 
        titleRecipes.length ? res.status(200).json(titleRecipes) : res.status(404).send("Recipe not found")
    } else {
        res.status(200).json(allRecipes)
    }
//    
} catch (error) {
    res.status(404).send({error: error.message})
}
} 
) 

router.get("/recipes/:id", async (req, res) => {
    
    const { id } = req.params
    const allRecipes = await getAllRecipes()

    try {
        if (!id) {
            res.status(404).send("Insert a valid recipe ID") 
        } else {
           
            let recipe = await allRecipes.filter(recipe => recipe.id == id)

            if (recipe.length) {
                res.status(200).json(recipe) 
            } else {
                res.status(404).send("Recipe not found")
            }
            
        }

    } catch (error) {
        console.log(error)
    }

})



router.post("/recipes", async (req, res) => {
    const { title, summary, healthScore, stepByStep, image, name, dishTypes } = req.body
     if (!title || !summary) res.status(400).json({error: "The recipe needs a title and a summary"})
     try {
        const recipe = await Recipe.create({title, summary, healthScore, stepByStep, image, dishTypes})
        const diet = await Type.findAll({
            where: {name}
        })
       await recipe.addType(diet)
        res.status(200).send("Recipe created")
    } catch (error) {
        res.status(404).send(error.message)
       }
})



router.get("/diets", async (req, res) => {
    try {
        
        dietsLocal.forEach(e => {
            Type.findOrCreate({
                where: {name: e}
            })
        })

        const diets = await Type.findAll()

        res.status(200).send(diets)
    } catch (error) {
        console.log(error)        
    }
})
 

module.exports = router