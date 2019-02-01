import axios from 'axios';
import store from '@/store';
import router from '@/router';
import config from '@/config';

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.serve : config.baseUrl.pro;
// 创建axios实例
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, // 设置请求超时时间
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});
// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
        config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(response => {
    return response;
}, error => {
    // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
        switch (error.response.status) {
        case 401:
            // 可能是token过期，清除它
            store.dispatch('UserLogout');
            // 跳转到登录页
            router.replace({
                path: 'login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: router.currentRoute.fullPath}
            });
        }
    }
    return Promise.reject(error.response);
});
export default instance;
/** 2018/12/26 17:25
 *author::^_夏流_^
 *describe: axios 封装
 */
