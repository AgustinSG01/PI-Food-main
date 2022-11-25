import axios from "axios";

export function getDetailRecipe(id) {
    return async function(dispatch) {
        try {
            const recipes = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: "GET_ID",
            payload: recipes.data.find(r => r.id == id)
        })
        } catch (error) {
            console.log(error)
        }
        
    }
}