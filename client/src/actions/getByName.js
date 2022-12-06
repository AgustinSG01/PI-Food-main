import axios from "axios";

export function getByName (title) {
    return async function (dispatch) {
        try {
            const recipes = await axios.get(`http://localhost:3001/recipes?title=${title}`)
            return dispatch({
                type: "GET_BY_NAME",
                payload: recipes.data
            })
        } catch (error) {
            alert("Recipe not found")
        }    
    }
}