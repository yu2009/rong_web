import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import config from '@/config';
import './index.less';

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
