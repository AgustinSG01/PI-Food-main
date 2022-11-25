import { Link } from "react-router-dom";

const FoodCard = ({image, title, healthScore, diets, id}) => {
    return (
        <div>
        <Link to={`/home/${id}`}>
        <h1> {title} </h1>
        <img src = {image} alt="image not found"/>
        </Link>
        <h3> {healthScore} </h3>
        <h2> {diets.join(", ")} </h2>
        </div>
    )
}

export default FoodCard