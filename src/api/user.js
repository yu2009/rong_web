import instance from '@/utils/axios';

export default {
    /*用户登录*/
    handleLogin (params) {
        return instance.post('/test/login', params);
    }
};
/** 2018/12/26 17:25
 *author::^_夏流_^
 *describe:
 */
