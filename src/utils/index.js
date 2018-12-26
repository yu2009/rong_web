import Cookies from 'js-cookie';
import config from '@/config';

const {title, cookieExpires} = config;
export const TOKEN_KEY = 'token';
/*
* 设置token
* */
export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1});
};
/*
* 获取token
* */
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
        return token;
    } else {
        return false;
    }
};
/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (metaTitle) => {
    const resTitle = title + ' - ' + metaTitle;
    window.document.title = resTitle;
};
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
    const keyValueArr = url.split('?')[1].split('&');
    let paramObj = {};
    keyValueArr.forEach(item => {
        const keyValue = item.split('=');
        paramObj[keyValue[0]] = keyValue[1];
    });
    return paramObj;
};
/** 2018/12/25 9:14
 *author::^_夏流_^
 *describe: 常用工具方法
 */
