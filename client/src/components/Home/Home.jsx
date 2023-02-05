import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import filterByDiets from "../../actions/filterByDiets";
import filterOrder from "../../actions/filterOrder";
import filterOrderH from "../../actions/filterOrderH";
import { getAllRecipes } from "../../actions/getAllRecipes";
import getDiets from "../../actions/getDiets";
import FoodCard from "../FoodCard/FoodCard";
import Paginated from "../Paginated/Paginated";
import { getByName } from "../../actions/getByName";
import "./Home.css"
import loader from "../../actions/loader";
import Loader from "../Loader/Loader";

export default function Home() {
  const dispatch = useDispatch();

  //Traigo recipes y diets del reducer
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);

  const loading = useSelector((state) => state.loading)

  console.log(recipes)
  //paginado
  const [state, setState] = useState({
    page: 1,
    recipes: 9,
  });

  useEffect(() => {
    setState({
      ...state,
      page: 1
    })
  },[recipes])
  
  const [order, setOrder] = useState("");

  const [search, setSearch] = useState("")

  const lastRecipe = state.page * state.recipes;
  const firstRecipe = lastRecipe - state.recipes;
  const actualRecipes = recipes.slice(firstRecipe, lastRecipe);
  const allPages = Math.ceil(recipes.length / 9)
  
const paginated = (pageNum) => {
    setState({
      ...state,
      page: pageNum,
    });
  };

  const nextPage = () => {
    if (state.page >= allPages) setState ({...state, page: 1})
    else setState({
      ...state,
      page: state.page + 1
    })
  }

  const prevPage = () => {
    if (state.page === 1) setState ({...state, page: allPages})
    else setState({
      ...state,
      page: state.page - 1
    })
  }

  //despacho
  useEffect(async () => {
    dispatch(loader())
    await dispatch(getAllRecipes());
    dispatch(getDiets());
    dispatch(loader())
  }, [dispatch]);

  //Funcion que filtra por dietas
  async function handleFilter(e) {
    e.preventDefault();
    dispatch(loader())    
    await dispatch(getAllRecipes());
    dispatch(filterByDiets(e.target.value));
    dispatch(loader())
  }

  //Funcion que ordena alfabeticamente
  async function handleOrder(e) {
    e.preventDefault();
    dispatch(filterOrder(e.target.value));
    setOrder(`Order changed to ${e.target.value}`);
    paginated(1);
  }

  //Funcion que ordena por healthScore
  async function handleOrderH(e) {
    e.preventDefault();
    dispatch(filterOrderH(e.target.value));
    setState({
      ...state,
      page: 1,
    });
    setOrder(`Order changed to ${e.target.value}`);
    paginated(1);
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getByName(search))
    setSearch("")
}

function handleSearch(e) {
    setSearch(e.target.value)
}
  if (!loading) {
    return <Loader />
  } else {
  return (
    <div className="generalContainerhome">

      <nav className="navbar">
          <button className="create" onClick={() => window.location.reload()}>PI - Foods</button>
        <form classname="form" onSubmit={(e) => handleSubmit(e)}>
    <input value={search} type="text" className="search__input" placeholder="Search your recipe..." onChange={(e) => handleSearch(e)}/>
    <button className="search__button">
        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </button>
        </form>
      <Link to="/create"><button className="create">Create recipe</button></Link>
      </nav>
      <div className="orderContainer">
        <select className="select" onChange={(e) => handleOrder(e)}>
          <option value="">Alphabetically order</option>
          <option value="asc">A to Z</option>
          <option value="des">Z to A</option>
        </select>
        <select className="select" onChange={(e) => handleOrderH(e)}>
          <option value="">Health score order</option>
          <option value="asc">Health Score asc</option>
          <option value="des">Health Score des</option>
        </select>
          <select className="select" onChange={(e) => handleFilter(e)}>
            <option>Diets filter</option>
            <option value="All">All</option>
            {diets.map((r) => {
              return <option value={r}>{r}</option>;
            })}
          </select>
      </div>
      <div className="foodContainer">
        {actualRecipes.map((recipe) => {
          return (
            <FoodCard
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              healthScore={recipe.healthScore}
              diets={recipe.diets}
              key={recipe.id}
            />
          );
        })}
      </div>
      <div>
        <Paginated
          recipes={recipes.length}
          recipesPerPage={state.recipes}
          paginated={paginated}
          nextPage={nextPage}
          prevPage={prevPage}
          key="paginated"
        />
      </div>
    </div>
  );}
}