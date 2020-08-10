import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Job from "./components/jobComponentEmployee";
import jobList from "./components/jobListComponentEmployee";

function User() {
  return (
    
    <div className="App">
      <header className="App-header">
      <Router>
        <div>
          <nav className="navbar-navbar-expand-navbar-dark-bg-dark">
            <a href="/job" className="navbar-brand">
              WebPortal
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/job"} className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/job"]} component={jobList} />
              <Route path="/job/:jobID" component={Job} />
            </Switch>
          </div>
        </div>
      </Router>
      </header>
    </div>

  );
}

export default User;