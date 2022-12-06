import axios from "axios";

export default function getDiets() {
    return async function(dispatch) {
        try {
            const diets = await axios.get("http://localhost:3001/diets")
            return dispatch ({
                type: "GET_DIETS",
                payload: diets.data.map(e => e.name)
            })
        } catch (error) {
            
        }
    }
}