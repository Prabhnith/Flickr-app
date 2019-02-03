import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Gallery from "./Components/Gallery/Gallery";
import Groups from "./Components/Groups/Groups";
import Overview from "./Components/Overview/Overview";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/groups" />
          )} />
          <Route exact path="/groups" component={Groups} />
          <Route path="/gallery/:groupID" component={Gallery} />
          <Route path="/overview" component={Overview} />
        </div>
      </Router>
    );
  }
}

export default App;
