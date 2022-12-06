import { Link } from "react-router-dom";
import React from "react";
import "./foodcard.css"
const FoodCard = ({image, title, healthScore, diets, id}) => {
    return (
        <Link to={`/home/${id}`} className="link">
        <div className="foodcard">
        <img src = {image} alt="image not found" className="foodimage"/>
        <h1 className="title"> {title} </h1>
        <h2 className="diets"> {diets.join(", ")} </h2>
        <h3 className="healthscore"> {healthScore} </h3>
        </div>
        </Link>
    )
}

export default FoodCard