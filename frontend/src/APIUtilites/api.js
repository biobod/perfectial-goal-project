import axios from 'axios';
import config from '../../../config/config';

const { serverPath } = config;

class Api {
  constructor(baseURL = serverPath) {
    this.axios = axios.create({
      baseURL,
      mode: 'same-origin',
      headers: {},
    });
  }

  getSome = () => this.axios.get('/api/user/test')

  getUser = id => this.axios.get(`/api/user/${id}`)

  loginUser = ({ email, password }) => this.axios.post('/api/user/login', { email, password })


  saveUser = ({ name, password, email }) => this.axios.post('/api/user/save', { name, password, email })
}

const api = new Api();
export default api;
