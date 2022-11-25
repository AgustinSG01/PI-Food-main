import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailRecipe } from "../../actions/getDetailRecipe"
import { useParams } from 'react-router-dom';

export default function DetailedFoodCard () {
    
    const dispatch = useDispatch()
    
    const recipeID = useSelector((state) => state.detailRecipe)
    
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getDetailRecipe(id))
    },[dispatch])

    return (
        <div>
            <img src={recipeID.image} alt="image not found"/>
            <h1> {recipeID.title} </h1>
            <div>
                <h3> {recipeID.healthScore} </h3>
            </div>
                <ul>
                {
                    recipeID.diets?.map(e => <li> {e} </li>)
                }
                </ul>
            
            <p> {recipeID.summary} </p>
            <div>
            <h2>Steps:</h2>
                {
               recipeID.stepByStep ? recipeID.stepByStep.map(e => {
                console.log(e)    
                return (<div>
                        <h3>Step {e.number}</h3>
                        <p>Ingredients: {e.ingredients.join()}</p>
                        <p> {e.step} </p>
                        </div>
                        ) 
                    }) : <h2>No steps available</h2>
                }
                
            </div>

        </div>
    )
}