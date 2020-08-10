import http from "../http-common";

class JobDataService {
  getAll() {
    return http.get("/job");
  }

  get(id) {
    return http.get(`/job/${id}`);
  }

  create(data) {
    return http.post("/job", data);
  }

  update(id, data) {
    return http.put(`/job/${id}`, data);
  }

  delete(id) {
    return http.delete(`/job/${id}`);
  }

  deleteAll() {
    return http.delete(`/job`);
  }

  findByTitle(title) {
    return http.get(`/job?title=${title}`);
  }

  findJobByUser(userID) {
    return http.get(`/posts/findJobsByUser/${userID}`);
  }

  findJobByID(jobID) {
    return http.get(`/job/${jobID}`);
  }
}

export default new JobDataService();