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
    // 检查元字段
    if (to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else {
        if (token) {
            if (Object.keys(from.query).length === 0) {
                next();
            } else {
                let redirect = from.query.redirect; // 如果来源路由有query
                if (to.path === redirect) { // 这行是解决next无限循环的问题
                    next();
                } else {
                    next({path: redirect}); // 跳转到目的路由
                }
            }
        } else {
            if (to.name === LOGIN_PAGE_NAME) {
                // 未登陆且要跳转的页面是登录页
                next(); // 跳转
            } else {
                next({
                    name: LOGIN_PAGE_NAME,
                    query: {redirect: to.fullPath}
                });
            }
        }
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
