import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { authenticationService } from "../Services/AuthenticationService";

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
