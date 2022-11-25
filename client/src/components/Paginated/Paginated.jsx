import React from "react";

export default function Paginated ({ recipes, recipesPerPage, paginated }) {
    const pageNum = []

    for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
        pageNum.push(i + 1)
    }

    return (
        <footer>
            <ul>
                {
                   pageNum && pageNum.map(num => (
                        <li>
                        <button onClick={() => paginated(num)}>{num}</button>
                        </li>)
                    )
                }
            </ul>
        </footer>
    )
}