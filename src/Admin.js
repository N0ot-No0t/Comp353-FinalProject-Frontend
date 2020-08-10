import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //useRouteMatch
} from "react-router-dom";

import User from "./components/userComponent";
import userList from "./components/userListComponent";

function Admin() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <div>
          <nav className="navbar-navbar-expand-navbar-dark-bg-dark">
            <a href="/user" className="navbar-brand">
              WebPortal
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/user"]} component={userList} />
              <Route path="/user/:userID" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
      </header>
    </div>
  );
}

export default Admin;