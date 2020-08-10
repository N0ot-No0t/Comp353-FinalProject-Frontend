import React, { Component } from "react";
import UserDataService from "../services/userService";
import JobDataService from "../services/jobService";


export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateAccStatus = this.updateAccStatus.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        userID: null,
        firstName: "",
        lastName: "",
        membership:"",
        email: "",
        password:"",
        userType: "",
        accountStatus: "",
        isFrozen: false,
        accountBalance: 0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.userID);
  }

  onChangeName(e) {
    const firstName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          firstName: firstName
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  getUser(userID) {
    UserDataService.get(userID)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAccStatus(status) {

    var data = {
      userID: this.state.currentUser.userID,
      firstName: this.state.currentUser.firstName,
      lastName: this.state.currentUser.lastName,
      email: this.state.currentUser.email,
      userType: this.state.currentUser.userType,
      password: this.state.currentUser.password,
      membership: this.state.currentUser.membership,
      isFrozen: this.state.currentUser.isFrozen,
      accountBalance: this.state.currentUser.accountBalance,
      accountStatus: status
    };

    UserDataService.update(this.state.currentUser.userID, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            accountStatus: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.userID,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {
      
    //JobDataService.

    UserDataService.delete(this.state.currentUser.userID)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/user')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <strong><label htmlFor="title">Name:</label></strong>
                <br/>
                {currentUser.firstName + " "+currentUser.lastName}
              </div>
              <div className="form-group">
                <strong><label htmlFor="description">Email:</label></strong>
                <br/>
                {currentUser.email}
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: &nbsp;</strong>
                </label>
                {currentUser.accountStatus}
              </div>
            </form>

            {currentUser.accountStatus == "activated" ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAccStatus("deactivated")}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAccStatus("activated")}
              >
                Activate
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            {/*
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            */}

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  }
}