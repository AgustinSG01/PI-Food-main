import { getRecipes, addRecipe, getByID, loading } from "../actions/actionTypes"

const initialState = {
    recipes: [],
    detailRecipe: {},
    loading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case getRecipes:
            return {
                ...state,
                recipes: action.payload
            }
        case getByID: 
            return {
                ...state,
                detailRecipe: action.payload
            }
        default:
            return state
    }
}