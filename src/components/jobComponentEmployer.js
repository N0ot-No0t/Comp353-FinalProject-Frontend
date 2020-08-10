import React, { Component } from "react";
import JobDataService from "../services/jobService";


export default class Job extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getJob = this.getJob.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateJob = this.updateJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);

    this.state = {
      currentJob: {
        jobID: null,
        title: "",
        description: "",
        datePosted: "",
        nbrOfPositionsAvailable: 0,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getJob(this.props.match.params.jobID);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentJob: {
          ...prevState.currentJob,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        description: description
      }
    }));
  }

  getJob(jobID) {
    JobDataService.get(jobID)
      .then(response => {
        this.setState({
          currentJob: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      jobID: this.state.currentJob.jobID,
      title: this.state.currentJob.title,
      description: this.state.currentJob.description,
      published: status
    };

    JobDataService.update(this.state.currentJob.jobID, data)
      .then(response => {
        this.setState(prevState => ({
          currentJob: {
            ...prevState.currentJob,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateJob() {
    JobDataService.update(
      this.state.currentJob.jobID,
      this.state.currentJob
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The job was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJob() {    
    JobDataService.delete(this.state.currentJob.jobID)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/job')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJob } = this.state;

    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJob.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentJob.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentJob.published ? "Applied" : "Not applied"}
              </div>
            </form>

            {currentJob.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Un-apply
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Apply
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJob}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateJob}
            >
              Update
            </button>
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