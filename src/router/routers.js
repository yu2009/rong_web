export default [
    {
        path: '/',
        name: 'home',
        mate: {
            title: '首页'
        },
        component: () => import('@/views/single-page/home')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录'
        },
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {},
        component: () => import('@/views/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {},
        component: () => import('@/views/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {},
        component: () => import('@/views/error-page/404.vue')
    }
];
/** 2018/12/24 16:39
 *author::^_夏流_^
 *describe:
 */
