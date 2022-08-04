import axios from 'axios';

class useEmployee {
  getAll(): Promise<any> {
    return axios.get(`/api/department/readAll`);
  }

  get(id: number): Promise<any> {
    return axios.get(`/api/department/${id}`);
  }

  create(data: any): Promise<any> {
    return axios.post('/api/department/create', data);
  }

  update(id: number, data: any): Promise<any> {
    return axios.put(`/api/department/update/${id}`, data);
  }

  delete(id: number): Promise<any> {
    return axios.delete(`/api/department/delete/${id}`);
  }

  // deleteAll(): Promise<any>{
  //   return axios.delete(`/todos`);
  // }

  // findByTitle(title: string): Promise<any> {
  //   return axios.get(`/todos?title=${title}`);
  // }
}

export default new useEmployee();