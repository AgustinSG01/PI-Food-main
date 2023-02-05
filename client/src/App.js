import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Landing from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DetailedFoodCard from './components/detailedFoodCard/DetailedFoodCard';
import CreateRecipe from './components/createRecipe/CreateRecipe';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/create" component={CreateRecipe}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path= "/home/:id" component={DetailedFoodCard}/>
    </div>
    </Router>
  );
}

export default App;
