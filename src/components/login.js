import { Redirect } from 'react-router';
import React, { Component } from "react";
import UserDataService from "../services/userService";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Employer from "../Employer";

var data = {
    email: null,
    password: null,
    userID: null,
    firstName: null,
    lastName: null,
    isFrozen: 0,
    userType: null
}

var redirectSubmit = false;

export default class Login extends Component {

//     constructor() {
//         super();
//         this.state = {
//           userId: null,
//           userType: '',
//           email: '',
//           membership: '',
//           password: '',
//           accountBalance: '',
//           firstName: '',
//           lastName: '',
//           accountStatus: '',
//           isFrozen: false
//         };
//   }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit = (e) => {
      e.preventDefault();
      // get our form data out of state
      // const { fName, lName, email, password } = this.state;
      
      //this.setState({redirect: true});

      redirectSubmit = true;

      var data = {
        email: this.state.email,
        password: this.state.password,
      }


      var user;
      UserDataService.verifyUser(this.state.email, this.state.password)
          .then(response => {
            //user = response.data[0];
            console.log("fucking response date piece of shit: "+response.data[0].userType)
            localStorage.setItem('currentUser',JSON.stringify(response.data[0]));
            console.log("localStorage userId before is "+(JSON.parse(localStorage.getItem('currentUser'))).userType);
            this.setState({
                userType: response.data[0].userType,
                
            });

            
            //console.log("reponse data is "+user.userType);
            // data = {
            //     userID: user.userID,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     isFrozen: user.isFrozen,
            //     userType: user.userType
            // }
          })
          .catch(e => {
            console.log(e);
          });

          

          //this.forceUpdate()
    }

    render() {

        localStorage.setItem('isLoggedIn',false);

        if (redirectSubmit) {
            //console.log("the data userID is " + this.state.userID);

            //localStorage.setItem('currentUser',this.state.userID);

            console.log("localStorage userId is "+localStorage.getItem('currentUser').userID);

            localStorage.setItem('isLoggedIn',true);

            console.log("isLoggedIn inside login.js"+ localStorage.getItem('isLoggedIn'))

            if ((JSON.parse(localStorage.getItem('currentUser'))).userType == "employer") {
                // return (<Switch>
                //     <Route path="/Employer" component={Employer}>
                //         <Employer />
                //     </Route>
                // </Switch>);

                return <Redirect to="/employer"/>;

            }

            if ((JSON.parse(localStorage.getItem('currentUser'))).userType == "employee") {
            
                return <Redirect to="/employee"/>;

            }

            if ((JSON.parse(localStorage.getItem('currentUser'))).userType == "admin") {
            
                return <Redirect to="/admin"/>;

            }


        }

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}