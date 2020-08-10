import React, { Component } from "react";
import JobDataService from "../services/jobService";
import { Link } from "react-router-dom";
import '../App.css';

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.removeAllJobs = this.removeAllJobs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      jobIDs: [],
      posts: [],
      tempJob: null,
      jobs: [],
      currentJob: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveJobsByUser((JSON.parse(localStorage.getItem('currentUser'))).userID);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveJobs() {
    JobDataService.getAll()
      .then(response => {
        this.setState({
          jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveJobsByUser(userID) {
    JobDataService.findJobByUser(userID)
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
       
        for (const[i, post] of this.state.posts.entries()) {
          this.state.jobIDs[i] = post.jobID;
        }
        console.log(this.state.jobIDs);
        var jobs = [];
        for (const[i, id] of this.state.jobIDs.entries()) {
          JobDataService.findJobByID(id)
            .then(response => {
              this.state.jobs[i] = response.data;
            })
        }
        this.state.jobs = jobs;
        console.log(this.state.jobs);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJobs();
    this.setState({
      currentJob: null,
      currentIndex: -1
    });
  }

  setActiveJob(job, index) {
    this.setState({
      currentJob: job,
      currentIndex: index
    });
  }

  removeAllJobs() {
    JobDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    JobDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle,jobIDs, jobs, currentJob, currentIndex } = this.state;

    return (
      <div className="list row">
        {/* <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-md-6">
          <h4>Jobs List</h4>

          <ul className="list-group">
            {jobs &&
              jobs.map((job, index) => (
                <li id="job-box"
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJob(job, index)}
                  key={index}
                >
                  {job.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllJobs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentJob ? (
            <div>
              <h4>Job</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJob.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentJob.description}
              </div>
              <div>
                <label>
                  <strong>Number of Positions:</strong>
                </label>{" "}
                {currentJob.nbrOfPositionsAvailable}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentJob.published ? "Applied" : "Not Applied"}
              </div>

              <div>
                <label>
                  <strong>Date Posted:</strong>
                </label>{" "}
                {currentJob.datePosted}
              </div>

              <Link
                to={"/job/" + currentJob.jobID}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}