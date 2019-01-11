import instance from '@/utils/axios';

export default {
    /*查询手机号是否被注册*/
    queryPhone (phoneNumber) {
        return instance.post('/test/queryPhone', phoneNumber);
    },
    /*用户登录*/
    handleLogin (params) {
        return instance.post('/test/login', params);
    },
    /*用户注册*/
    handleRegister (params) {
        return instance.post('/test/register', params);
    },
    /*验证码短信*/
    sendSms (params) {
        return instance.post('/test/sms', params);
    }
};
/** 2018/12/26 17:25
 *author::^_夏流_^
 *describe:
 */
