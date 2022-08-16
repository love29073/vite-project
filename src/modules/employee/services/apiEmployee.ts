import axios from "axios";

class useEmployee {
  getAll(): Promise<any> {
    return axios.get(`/api/employee/readAll`);
  }

  get(id: number): Promise<any> {
    return axios.get(`/api/employee/${id}`);
  }

  create(data: any): Promise<any> {
    return axios.post("/api/employee/create", data);
  }

  update(id: number, data: any): Promise<any> {
    return axios.put(`/api/employee/update/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return axios.delete(`/api/employee/delete/${id}`);
  }

  // deleteAll(): Promise<any>{
  //   return axios.delete(`/todos`);
  // }

  // findByTitle(title: string): Promise<any> {
  //   return axios.get(`/todos?title=${title}`);
  // }
}

export default new useEmployee();
