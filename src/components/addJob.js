import React, { Component } from "react";
import JobDataService from "../services/jobService";
import { mockComponent } from "react-dom/test-utils";

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.nbrOfPositionsAvailable = this.onChangeNbrOfPositionsAvailable.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.newJob = this.newJob.bind(this);
    
    

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,
      datePosted: "",
      nbrOfPositionsAvailable:0,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeNbrOfPositionsAvailable(e) {
    this.setState({
      nbrOfPositionsAvailable: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveJob() {

    let currentDate = new Date();

    var data = {
      title: this.state.title,
      description: this.state.description,
      datePosted: currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate(),
      //datePosted: this.state.datePosted,
      nbrOfPositionsAvailable: this.state.nbrOfPositionsAvailable
    };

    console.log("The date is "+data.datePosted+"and the nbr of pos is "+data.nbrOfPositionsAvailable);

    JobDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          datePosted: response.data.datePosted,
          nbrOfPositionsAvailable: response.data.nbrOfPositionsAvailable,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJob() {

    let currentDate = new Date();

    //console.log("date is " + datePosted.getFullYear()+"-"+(datePosted.getMonth()+1)+"-"+datePosted.getDate());

    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      datePosted: currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate(),
      nbrOfPositionsAvailable: 0,

      submitted: false
    });

  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newJob}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nbrOfPositionsAvailable">Number of Positions</label>
              <input
                type="text"
                className="form-control"
                id="nbrOfPositionsAvailable"
                required
                value={this.state.nbrOfPositionsAvailable}
                onChange={this.nbrOfPositionsAvailable}
                name="nbrOfPositionsAvailable"
              />
            </div>

            <button onClick={this.saveJob} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}