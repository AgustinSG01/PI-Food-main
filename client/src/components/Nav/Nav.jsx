// import { Link } from "react-router-dom";
// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux"
// import { useEffect } from "react";
// import { getByName } from "../../actions/getByName";

// const [state, setState] = useState("")

// const dispatch = useDispatch()

// function handleSubmit(e) {
//     e.preventDefault()
//     dispatch(getByName(state))
// }

// function handleSearch(e) {
//     setState(e.target.value)
// }

// export const Nav = () => {
//     return (
//         <div>
//             <form onSubmit={(e) => handleSubmit(e)}>
//             <input type="search" placeholder="Search recipe" value={state} onChange={(e) => handleSearch(e)}/>
//             <button type="submit">Search</button>
//             </form>
//         </div>
//     )
// }

// export default Nav