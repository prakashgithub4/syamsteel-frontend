import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


// import './App.css';
 import Add from './components/Add';
 import Profile from './components/Profile';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
  
// } from "react-router-dom";

function App() {
  return (
    <Router>
    {/* <Switch>
       <Route path="/">
          <Add/>
       </Route>
       <Route path='/details'>
          <Profile/>
       </Route>
    </Switch> */}
      <Switch>
          <Route exact path="/" component={Add}/>
          <Route path="/details/:id" component={Profile}/>
        </Switch>
    </Router>
    
  );
}

export default App;
