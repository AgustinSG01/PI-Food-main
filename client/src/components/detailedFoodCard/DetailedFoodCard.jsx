import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailRecipe } from "../../actions/getDetailRecipe"
import { useParams, useHistory } from 'react-router-dom';
import "./detailedFoodCard.css"

export default function DetailedFoodCard () {
    
    const dispatch = useDispatch()
    
    const recipeID = useSelector((state) => state.detailRecipe)
    
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getDetailRecipe(id))
    },[dispatch])

    return (
        <div className="genetailDetailContainer">
            <div>
            <img src={recipeID.image} alt="image not found" className="detailImage"/>
            <h1 className="detailTitle"> {recipeID.title} </h1>
                <h3 className="detailHealthscore"> {recipeID.healthScore} </h3>
                <h2 className="dietsTitle">Diets: </h2>
                <ul className="diets">
                {
                    recipeID.diets?.map(e => <li className="eachdiet"> {e},  </li>)
                }
                </ul>
                <h2 className="dishTypesTitle">Dishtypes: </h2>
                <ul className="dishTypes">
                    {
                        Array.isArray(recipeID.dishTypes) ? recipeID.dishTypes.map(e => <li className="eachDishType"> {e + "," + " "} </li>) : <p> {recipeID.dishTypes} </p>
                    }
                </ul>
            </div>
            
            <p className="summary"> {recipeID.summary} </p>
            <div>
            
            <h2 className="stepsTitle">Steps:</h2>
            <ol className="steps">

                {
                    recipeID.stepByStep ? recipeID.stepByStep.map(e => {
                        console.log(e)  
                        return (
                            <li className="eachStep"> {e} </li>
                            ) 
                        }) : <div className="failcontainer"><h2>There's no steps</h2></div>
                    }
            </ol>
                
            </div>

        </div>
    )
}