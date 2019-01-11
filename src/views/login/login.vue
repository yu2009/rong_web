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
              />
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
              />
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

export default {
    name: 'LoginForm',
    data () {
        return {
            btn_loading: false,
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
        loginSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.handleLogin(this.formValidate).then(res => {
                        if (res.data.success) {
                            this.$store.dispatch('handleLogin', res.data.token);
                            this.$router.push({
                                name: this.$config.homeName
                            });
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.$Message.error('Fail!');
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
