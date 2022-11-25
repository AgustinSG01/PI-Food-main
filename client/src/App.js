import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Landing from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import DetailedFoodCard from './components/detailedFoodCard/DetailedFoodCard';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route path="/" component={Nav}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path= "/home/:id" component={DetailedFoodCard}/>
    </div>
    </Router>
  );
}

export default App;
