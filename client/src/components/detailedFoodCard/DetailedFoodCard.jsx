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
    
    const history = useHistory()

    useEffect(() => {
        dispatch(getDetailRecipe(id))
    },[dispatch])

    return (
        <div className="genetailDetailContainer">
            <div className="container1">
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
                <button onClick={() => history.push("/home")} className="back2">
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span>
</button>
                <ul className="dishTypes">
                    {
                        Array.isArray(recipeID.dishTypes) ? recipeID.dishTypes.map(e => <li className="eachDishType"> {e + "," + " "} </li>) : <p> {recipeID.dishTypes} </p>
                    }
                </ul>
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
                        }) : <div><h2>There's no steps</h2></div>
                    }
            </ol>
            </div>
                
            </div>

        </div>
    )
}