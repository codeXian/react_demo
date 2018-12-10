import axios from 'axios';
import { message } from 'antd';

const { CancelToken } = axios;

export let cancel;

const Axios = axios.create({
  timeout: 10000,
});

// 添加请求拦截器

Axios.interceptors.request.use(
  function(config) {
    //  if (store.token) {
    //   config.headers['TOKEN'] = getCookie('TOKEN')
    //  }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器

Axios.interceptors.response.use(
  function(response) {
    const { data } = response;
    if (data.code !== 200) {
      if (data.code === 100) {
        message.error('非法的token');
      }
      if (data.code === 101) {
        message.error('其他客户端登录了');
      }
      if (data.code === 102) {
        message.error('token过期了');
      }
      return Promise.reject('error');
    } else {
      return response;
    }
  },
  function(error) {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default {
  // get 请求
  get(url, params) {
    return new Promise((resolve, reject) => {
      Axios({
        method: 'get',
        url,
        params,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // post 请求
  post(url, params) {
    return new Promise((resolve, reject) => {
      Axios({
        method: 'post',
        url,
        data: params,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
