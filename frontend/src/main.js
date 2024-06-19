import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import axios from 'axios';

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);

axios.defaults.baseURL = 'http://localhost:5000'; // Adicione esta linha

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

app.config.globalProperties.$http = axios;

app.mount('#app');
