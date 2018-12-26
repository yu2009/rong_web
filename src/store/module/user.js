import axios from 'axios';
import {setToken, getToken} from '../../utils';

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
        handleLogin ({commit}, {userName, password}) {
            userName = userName.trim();
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                    userName: userName,
                    password: password
                }).then((res) => {
                    const data = res.data;
                    commit('setToken', data.token);
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
};
/** 2018/12/26 17:19
 *author::^_夏流_^
 *describe:
 */
