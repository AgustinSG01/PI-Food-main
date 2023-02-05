import React from "react";
import {Link} from "react-router-dom"
import background from "../../img/backgroundWoman.jpg"
import "./LandingPage.css"

export default function Landing () {
    return(
        <div className="generalContainer">
            <div className="background">
                <img src={background} alt="not found" className="imageBackground"></img>
            </div>
            <div className="logoandbutton">
            <div className="logoContainer">
            <h1 className="titlelading">A good meal <br/> makes <br/>a good day</h1>
            </div >
            <div className="buttonContainer">
            <Link to="/home">
            <button className="button">
                Go to the menu
            </button>
            </Link>
            </div>
            </div>
        </div>
    )
}