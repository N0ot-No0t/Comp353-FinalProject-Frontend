import React, { Component } from "react";
import UserDataService from "../services/userService";


export default class AddUser extends Component {
    constructor(props) {
      super(props);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.saveJob = this.saveJob.bind(this);
      this.newJob = this.newJob.bind(this);
  
      this.state = {
        id: null,
        title: "",
        description: "", 
        published: false,
  
        submitted: false
      };
    }




}