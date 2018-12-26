const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir);
};
//项目部署在域的根目录下,默认：'/'指定子路径改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/';
module.exports = {
    baseUrl: BASE_URL,
    lintOnSave: true,

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // 根路径
            .set('_c', resolve('src/components')); // 组件路径
    },

    // 设为false打包时不生成.map文件
    productionSourceMap: false,

    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        port: 8090, // 端口号
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:3000'
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    }
};
/** 2018/12/24 16:13
 *author::^_夏流_^
 *describe:
 */
