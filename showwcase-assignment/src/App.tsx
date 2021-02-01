import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import EducationDetails from "./view/educationDetails";
import { connect } from "react-redux";
import { AppState } from "./store/rootStore";
import WelcomeForm from "./components/home/welcomeForm";

function App(props: IAppProps) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomeForm} />
        {props.name ? (
          <Route exact path="/education" component={EducationDetails} />
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </Router>
  );
}

interface IAppProps {
  name: string;
}

const mapStateToProps = (state: AppState) => ({
  name: state.home.name,
});

export default connect(mapStateToProps)(App);
