import {
  getRecipes,
  addRecipe,
  getByID,
  loading,
  getDiets,
  filterByDiets,
  filterOrder,
  filterOrderH,
  getByName,
  postRecipe,
  loader
} from "../actions/actionTypes";

const initialState = {
  recipes: [],
  recipesCopy: [],
  detailRecipe: {},
  diets: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getRecipes:
      return {
        ...state,
        recipes: action.payload,
        recipesCopy: action.payload,
      };
    case getByID:
      return {
        ...state,
        detailRecipe: action.payload,
      };
    case getDiets:
      return {
        ...state,
        diets: action.payload,
      };
    case filterByDiets:
      const allRecipes = state.recipes;
      const filteredRecipes =
        action.payload !== "All"
          ? allRecipes.filter((e) => e.diets.includes(action.payload))
          : allRecipes;
      return {
        ...state,
        recipes: filteredRecipes,
      };
    case filterOrder:
      let all = state.recipes;
      if (!action.payload) return {
        ...state,
        recipes: state.recipesCopy
      }
      if (action.payload === "asc") {
        all = all.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          else return 0;
        });
      } else if (action.payload === "des") {
        all = all.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          return 0;
        });
      }
      return {
        ...state,
        recipes: all,
      };
    case filterOrderH:
      let allR = state.recipesCopy;
      if (action.payload === "") return {
        ...state,
        recipes: state.recipesCopy
      }
      if (action.payload === "asc") {
        allR = allR.sort((a, b) => {
          if (a.healthScore > b.healthScore) return 1;
          if (a.healthScore < b.healthScore) return -1;
          return 0;
        });
      } else if (action.payload === "des") {
        allR = allR.sort((a, b) => {
          if (a.healthScore < b.healthScore) return 1;
          if (a.healthScore > b.healthScore) return -1;
          return 0;
        });
      }
      return {
        ...state,
        recipes: allR,
      };
    case getByName:
        return {
            ...state,
            recipes: action.payload
        }
    case postRecipe:
      return {
        ...state
      }
    case loader: 
    if (state.loading) return {...state, loading: false}
    if (!state.loading) return {...state, loading: true}
    default:
      return state;
  }
}
