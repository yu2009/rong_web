import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import iView from 'iview';
import {setToken, getToken, setTitle} from '../utils';

Vue.use(Router);
const router = new Router({
    routes,
    mode: 'history'
});
const LOGIN_PAGE_NAME = 'login';
const HOME_NAME = 'home';
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    const token = getToken();
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        // next({
        //     name: LOGIN_PAGE_NAME
        // });
        next();
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next(); // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next({
            name: HOME_NAME // 跳转到homeName页
        });
    } else {
        setToken('');
        next();
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
