import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import iView from 'iview';
import {getToken, setTitle} from '../utils';

Vue.use(Router);
const router = new Router({
    routes,
    mode: 'history'
});
const LOGIN_PAGE_NAME = 'login';
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    const token = getToken();
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        console.log(to.fullPath);
        next({
            name: LOGIN_PAGE_NAME,
            query: {redirect: to.fullPath}
        });
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next(); // 跳转
    } else if (token && (to.name === LOGIN_PAGE_NAME || to.name === 'register')) {
        // 已登录且要跳转的页面是登录页或者注册页
        next({
            name: 'home' // 跳转到homeName页
        });
    } else {
        let redirect = from.query.redirect; // 如果来源路由有query
        if (to.path === redirect) { // 这行是解决next无限循环的问题
            next();
        } else {
            next({path: redirect}); // 跳转到目的路由
        }
        // next();
    }
});
router.afterEach(to => {
    setTitle(to.meta.title);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
export default router;
/** 2018/12/24 16:39
 *author::^_夏流_^
 *describe:
 */
