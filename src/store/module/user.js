import {setToken, getToken} from '@/utils';

export default {
    state: {
        userName: '',
        userId: '',
        avatorImgPath: '',
        token: getToken(),
        access: ''
    },
    mutations: {
        setAvator (state, avatorPath) {
            state.avatorImgPath = avatorPath;
        },
        setUserId (state, id) {
            state.userId = id;
        },
        setUserName (state, name) {
            state.userName = name;
        },
        setAccess (state, access) {
            state.access = access;
        },
        setToken (state, token) {
            state.token = token;
            setToken(token);
        }
    },
    getters: {
        //
    },
    actions: {
        /*
        * 登录
        * */
        handleLogin ({commit}, token) {
            console.log(token);
            commit('setToken', token);
        }
    }
};
/** 2018/12/26 17:19
 *author::^_夏流_^
 *describe:
 */
