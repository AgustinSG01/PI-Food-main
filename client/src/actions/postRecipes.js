import axios from "axios"

export default function postRecipes(payload) {
    return async function (dispatch) {
        const recipe = await axios.post("http://localhost:3001/recipes",payload)
        return recipe
    }
}