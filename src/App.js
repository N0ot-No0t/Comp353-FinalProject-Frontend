import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //useRouteMatch
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import SignUp from "./components/register";
import Employer from "./Employer";
import Employee from "./Employee";
import Admin from "./Admin";

//localStorage.setItem('isLoggedIn',false);

//console.log("isLoggedin inside app.js (beginning)"+localStorage.getItem('isLoggedIn'))
function App() {
  return (

    <div className="App">
      <header className="App-header">
      
      <div><h2>Welcome to the Web Career Portal Site</h2></div>

      <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">

          {console.log("isLoggedin inside app.js"+localStorage.getItem('isLoggedIn'))}

        {localStorage.getItem('isLoggedIn') ? (

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
          ) : (
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"}>Logout</Link>
                </li>
              </ul>
            </div>
          )
        }
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/'/>
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/employer" component={Employer}>
            <Employer/>
            </Route>
            <Route path="/employee" component={Employee}>
            <Employee/>
            </Route>
            <Route path="/admin" component={Admin}>
            <Admin/>
            </Route>
          </Switch>
        </div>
      </div>
    </div></Router>

      </header>
    </div>
  );
}

function Home() {
  return <h2>Welcome to the Web Career Portal Site</h2>;
}

export default App;
