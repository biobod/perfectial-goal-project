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

  getSome = () => this.axios.post('/api/some/', {})
}

const api = new Api();
export default api;
