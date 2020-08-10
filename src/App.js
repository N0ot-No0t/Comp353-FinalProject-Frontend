import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //useRouteMatch
} from "react-router-dom";
import Employer from './Employer';
import Employee from './Employee';
import Admin from './Admin';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <Router>
      <div>
        <nav>
            <div> 
              <Link to="/Home">Home</Link>
            </div>
            <div> 
            </div>
              <Link to="/Employer">Employer</Link>
            <div> 
               <Link to="/Employee">Employee</Link>
            </div>
            <div> 
               <Link to="/Admin">Admin</Link>
            </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Employer" component={Employer}>
            <Employer />
          </Route>
          <Route path="/Employee" component={Employee}>
            <Employee />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Admin" component={Admin}>
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>

      </header>
    </div>
  );
}

function Home() {
  return <h2>Welcome to the Web Career Portal Site</h2>;
}

export default App;
