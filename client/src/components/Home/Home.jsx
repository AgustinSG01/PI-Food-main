import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../actions/getAllRecipes";
import FoodCard from "../FoodCard/FoodCard"
import Paginated from "../Paginated/Paginated";

export default function Home () {
   
    const dispatch = useDispatch()
  
    const recipes = useSelector((state) => state.recipes)
  
    const [state, setState] = useState({
        page: 1,
        recipes: 9
    })
    const lastRecipe = state.page * state.recipes
    const firstRecipe = lastRecipe - state.recipes
    const actualRecipes = recipes.slice(firstRecipe, lastRecipe)

    const paginated = (pageNum) => {
        setState({
            ...state,
            page: pageNum})
    }

    useEffect(() => {
        dispatch(getAllRecipes())
    },[dispatch])
  
    return (
        <div>
            <Link to="/create">Create recipe</Link>
            <h1>
               Foods 
            </h1>
            <div>
                <select>
                    <option value="asc">Ascendent</option>
                    <option value="des">Descendent</option>
                </select>
                <select>
                    <option value="alp">Alphabetically</option>
                    <option value="helath">Health Score</option>
                </select>
                <select>
                    <option value="all">All</option>
                    <option value="nogluten">Gluten Free</option>
                    <option value="keto">Ketogenic</option>
                    <option value="veg">Vegetarian</option>
                    <option value="lactoveg">Lacto-Vegetarian</option>
                    <option value="ovoveg">Ovo-Vegetarian</option>
                    <option value="lactovoveg">Lacto-vo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pesce">Pescetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low">Low FODMAP</option>
                    <option value="whole">Whole30</option>
                </select>
            </div>
            <div>
            {
                actualRecipes?.map(recipe => {
                    return (
                    <FoodCard
                        id= {recipe.id}
                        image= {recipe.image}
                        title= {recipe.title}
                        healthScore= {recipe.healthScore}
                        diets= {recipe.diets}
                        key= {recipe.id}
                        />)}
                    )
            }
            </div>
            <div> 
            <Paginated 
            recipes = {recipes.length}
            recipesPerPage = {state.recipes}
            paginated = {paginated}
            />
            </div>
        </div>
    )
}