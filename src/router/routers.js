import adminIndex from '@/views/admin-web/admin-index';

export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: () => import('@/views/single-page/home/home'),
        children: [
            {
                path: 'publish-article',
                name: 'publish-article',
                meta: {
                    title: '发布文章'
                },
                component: () => import('@/views/single-page/article/publish-article')
            }
        ]
    },
    {
        path: '/admin',
        name: '_admin',
        redirect: '/admin/article-manager',
        component: adminIndex,
        children: [
            {
                path: 'article-manager',
                name: 'article-manager',
                meta: {
                    title: '文章管理'
                },
                component: () => import('@/views/admin-web/article-manager')
            },
            {
                path: 'article-create/:id?',
                name: 'article-create',
                meta: {
                    title: '文章创建'
                },
                component: () => import('@/views/admin-web/article-create')
            }
        ]
    },
    {
        path: '/article',
        name: 'article',
        meta: {
            title: '文章页'
        },
        component: () => import('@/views/single-page/article/article')
    },
    {
        path: '/article-details/:id',
        name: 'article-details',
        meta: {
            title: '文章详情'
        },
        component: () => import('@/views/single-page/article/article-details')
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
        path: '/register/:id',
        name: 'register',
        meta: {
            title: 'Register - 注册',
            requiresAuth: true
        },
        component: () => import('@/views/register/register.vue')
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {title: ''},
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
        meta: {title: 'error_404'},
        component: () => import('@/views/error-page/404.vue')
    }
];
/** 2018/12/24 16:39
 *author::^_夏流_^
 *describe:
 */
