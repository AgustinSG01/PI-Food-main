import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import postRecipes from "../../actions/postRecipes"
import getDiets from "../../actions/getDiets";
import {useDispatch, useSelector} from "react-redux"
import "./createRecipe.css"

export default function CreateRecipe () {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [input, setInput] = useState({
        title: "",
        summary: "",
        healthScore: "",
        stepByStep: [],
        image: "",
        name: [],
        dishTypes: ""
    })

    const [steps, setSteps] = useState("")

    useEffect(() => {
        dispatch(getDiets())
    }, [])
    
    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    

    function submitSteps(e) {
        e.preventDefault()
        if (steps.trim() == "") return alert ("Please insert a step")
        setInput({
            ...input,
            stepByStep: [...input.stepByStep, steps]
        })
        setSteps("")
    }

    function deleteSteps (e) {
        e.preventDefault()
        if (e.target.name === "last") {
            input.stepByStep.pop()
            setInput({
                ...input
            })
        } else {
            setInput({
                ...input,
                stepByStep: []
            })
        }
        }

    function handleDiets (e) {
        if(e.target.checked) {
            setInput({
                ...input,
                name: [...input.name, e.target.value]
            })
        }
        else {
            setInput({
                ...input,
                name: input.name.filter(a => a !== e.target.value)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!input.title) return alert("Recipe name is required")
        if (!input.summary) return alert("Recipe summary is required")
        if (input.healthScore < 0 || input.healthScore > 100) return alert("Health score must be between 0 and 100")
        if(!input.image) input.image = "https://static.vecteezy.com/system/resources/previews/002/621/145/large_2x/chef-kitchen-restaurant-catering-food-line-style-icon-free-vector.jpg"
        dispatch(postRecipes(input))
        setInput({
            title: "",
            summary: "",
            healthScore: "",
            stepByStep: "",
            image: "",
            name: [],
            dishTypes: ""
        })
        alert("Recipe created succesfully")
        history.push("/home")
    }

    return (
        <div className="generalCreateContainer">
            <Link to="/home">
            <button className="back">
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span>
</button>
            </Link>
            {/* <h1 className="createTitle">
                Create a recipe
            </h1> */}
            <div className="form">
            <form onSubmit={e => handleSubmit(e)}>
                <div className="recipeName">
                    <label>Recipe name* <br/></label>
                    <input className="nameText" type="text" name="title" value={input.title} onChange={(e) => handleChange(e)} placeholder="Insert recipe name..."/><br/>
                    
                </div>
                <div className="recipeSummary">
                    <label>Recipe Summary* <br/></label>
                    <textarea className="summaryText" cols="25" rows="5" type="text" name="summary" value={input.summary} onChange={(e) => handleChange(e)} placeholder="Insert recipe summary..."/>
                </div>
                <div className="recipeImage">
                    <label>Image<br/></label>
                    <input className="imageText" placeholder="Insert image URL..." name="image" type="text" value={input.image} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="recipeHealthscore">
                    <label>Health score </label>
                    <input className="healthscoreText" type="number" name="healthScore" min="1" max="100" onChange={(e) => handleChange(e)} value={input.healthScore}/> 
                </div>
                <div className="recipeSteps">
                    <label className="stepsLabel">Steps<br/></label>
                    <textarea className="stepsText" cols="25" rows="5" placeholder="Insert steps for the recipe..." type="text" name="steps" value={steps} onChange={(e) => setSteps(e.target.value)}/><br/> 
                    <button className="buttonStep" type="button" onClick={(e) => submitSteps(e)}>Add step</button>
                    <button className="buttonStep" name="last" type="button" onClick={(e) => deleteSteps(e)}>Delete last step</button>
                    <button className="buttonStep" name="all" type="button" onClick={(e) => deleteSteps(e)}>Delete all steps</button>
                    <div>
                    <ol>
                        {
                            input.stepByStep?.map(e => <li> {e} </li>)
                        }
                    </ol>
                    </div>
                </div>
                <fieldset className="dietsContainer">
                    <legend>Select the diets of your recipe <br/></legend>
                    {
                        diets?.map(e => {
                            return (
                                <label>
                                <input onChange={handleDiets} name="diets" type="checkbox"value={e} className="diets"/>
                                {e}
                                </label> 
                            )
                        })
                    }
                </fieldset>
                <div>
                    <label>What dishtype is? <br/></label>
                    <input type="text" className="dishtypeText" name="dishTypes"value={input.dishTypes} onChange={handleChange}></input>
                </div>
                <div>
                    <button className="submitButton" type="submit">Create recipe!</button>
                </div>
            </form> 
            </div>
        </div>
    )
}