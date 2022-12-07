import React from "react";
import "./Paginated.css"

export default function Paginated ({ recipes, recipesPerPage, paginated, nextPage, prevPage }) {
    const pageNum = []

    for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
        pageNum.push(i + 1)
    }
    
    return (
        <footer>
            <ul>
                <li><button onClick={() => prevPage()} className="buttonpage"> {"<"} </button></li>
                {
                   pageNum && pageNum.map(num => (
                        <li>
                        <button className="buttonpage" onClick={() => paginated(num)}>{num}</button>
                        </li>)
                    )
                }
                <li><button onClick={() => nextPage()} className="buttonpage"> {">"} </button></li>
            </ul>
        </footer>
    )
}