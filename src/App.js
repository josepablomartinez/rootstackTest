import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import MapComponent from "./MapComponent";
import Nav from "./common/nav";
import { authenticationService } from "./Services/AuthenticationService";

class App extends Component {
  render() {
    let user = authenticationService.loginUser;
    return (
      <>
        <Nav authenticated={user === ""} />
        <Route path="/" exact component={Login} />
        <Route path="/map" exact component={MapComponent} />
      </>
    );
  }
}

export default App;
