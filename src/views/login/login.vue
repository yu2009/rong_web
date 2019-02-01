<style lang="less">
@import "./login.less";
</style>
<template>
  <div class="login">
    <div class="login-con">
      <transition
        name="in-out-translate-fade"
        mode="in-out"
        tag="div"
      >
        <!--登录-->
        <Card :bordered="false">
          <div slot="title">
            <img
              src="../../assets/images/logoT_03.png"
              alt=""
            >
            <h2>登录账号</h2>
          </div>
          <Form
            ref="loginForm"
            :model="formValidate"
            :rules="ruleValidate"
            @keydown.enter.native="loginSubmit('loginForm')"
          >
            <FormItem prop="phoneNumber">
              <Input
                v-model="formValidate.phoneNumber"
                size="large"
                placeholder="用户名或手机号"
              >
              <span slot="prepend">
                <Icon
                  :size="16"
                  type="ios-contact"
                />
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                v-model="formValidate.password"
                size="large"
                type="password"
                placeholder="密码"
              >
              <span slot="prepend">
                <Icon
                  :size="16"
                  type="ios-lock"
                />
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button
                size="large"
                type="success"
                long
                :loading="submit_loading"
                @click="loginSubmit('loginForm')"
              >
                登录
              </Button>
            </FormItem>
            <FormItem class="login-register-frame">
              <Button
                type="text"
                ghost
                to="/register/1"
              >
                注册账号
              </Button>
              <Button
                type="text"
                ghost
                to="/register/2"
              >
                忘记密码？
              </Button>
            </FormItem>
            <FormItem class="powered-by">
              Powered By Xia`Liu
            </FormItem>
          </Form>
        </Card>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import axios from '@/api/user';
import {Card, Button, Form, FormItem, Input, Icon, Message} from 'iview'

export default {
    name: 'LoginForm',
    components: {
        Card,
        Button,
        Form,
        FormItem,
        Input,
        Icon,
        Message
    },
    data() {
        return {
            submit_loading: false,
            formValidate: {
                phoneNumber: '',
                password: ''
            },
            ruleValidate: {
                phoneNumber: [
                    {required: true, message: '账号不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        ...mapActions([
            'handleLogin'
        ]),
        /*
            * 登录提交
            * */
        loginSubmit(name) {
            let _this = this;
            _this.$refs[name].validate((valid) => {
                if (valid) {
                    _this.submit_loading = true;
                    axios.handleLogin(_this.formValidate).then(res => {
                        if (res.data.success) {
                            _this.$store.dispatch('handleLogin', res.data.token);
                            _this.$router.push({
                                name: _this.$config.homeName
                            });
                        } else {
                            Message.error(res.data.message)
                        }
                        _this.submit_loading = false;
                    }).catch((error) => {
                        _this.submit_loading = false;
                        if (error === undefined) {
                            Message.error('无法连接到后台接口!')
                        } else {
                            Message.error(error)
                        }
                    });
                } else {
                    Message.error('请输入账号和密码');
                }
            });
        }
    }
};
</script>
<!--
*author::^_夏流_^
*describe: 登录
*2018/12/20 14:46
-->
