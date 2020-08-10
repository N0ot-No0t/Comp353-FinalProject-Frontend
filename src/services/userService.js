import http from "../http-common";

class UserDataService {
  
  getAll() {
    return http.get("/user");
  }

  create(data) {
    return http.post("/user", data);
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  get(email) {
    return http.get(`/user/${email}`);
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  deleteAll() {
    return http.delete(`/user`);
  }

  findByName(firstName) {
    return http.get(`/user?firstName=${firstName}`);
  }

  verifyUser(email, password){
    return http.get(`/user/auth/${email}/${password}`);
  }

}

export default new UserDataService();