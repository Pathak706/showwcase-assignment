import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import EducationDetails from "./view/educationDetails";
import HomePage from "./view/homePage";
import { useSelector } from "react-redux";
import { rootStore } from "./store/rootStore";

function App() {
  const name = useSelector((state: rootStore) => state.home).name;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {name ? (
          <Route exact path="/education" component={EducationDetails} />
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
