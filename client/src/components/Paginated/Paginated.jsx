import React from "react";
import style from "./Paginated.css"

export default function Paginated ({ recipes, recipesPerPage, paginated }) {
    const pageNum = []

    for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
        pageNum.push(i + 1)
    }
    
    return (
        <footer>
            <ul>
                <li><button className="buttonpage"> prev </button></li>
                {
                   pageNum && pageNum.map(num => (
                        <li>
                        <button className="buttonpage" onClick={() => paginated(num)}>{num}</button>
                        </li>)
                    )
                }
                <li><button className="buttonpage"> next </button></li>
            </ul>
        </footer>
    )
}