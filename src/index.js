import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Router>
        <ul>
          <li>
            NavL
          </li>
        </ul>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
