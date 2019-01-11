<style lang="less">
    @import "../login/login.less";
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card :bordered="false">
        <div slot="title">
          <img
            src="../../assets/images/logoT_03.png"
            alt=""
          >
          <h2>{{ $route.params.id === '1' ? '注册账号' : '找回密码' }}</h2>
        </div>
        <Form
          ref="loginForm"
          :model="formValidate"
          :rules="ruleValidate"
          @keydown.enter.native="registerSubmit('loginForm')"
        >
          <FormItem prop="phoneNumber">
            <Input
              v-model="formValidate.phoneNumber"
              size="large"
              :maxlength="11"
              clearable
              placeholder="手机号"
            />
            <span slot="prepend">
              <Icon
                :size="16"
                type="ios-contact"
              />
            </span>
            </Input>
          </FormItem>
          <FormItem prop="verificationCode">
            <Input
              v-model="formValidate.verificationCode"
              size="large"
              placeholder="验证码"
            />
            <span slot="prepend">
              <Icon
                :size="16"
                type="md-chatboxes"
              />
            </span>
            <span slot="suffix">
              <Button
                type="primary"
                :disabled="showCountdown"
                :loading="btn_loading"
                @click="endVerification"
              >
                {{ timer === 60 ? '发送验证码' : '重新发送 '+timer + ' s' }}
              </Button>
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
              @click="registerSubmit('loginForm')"
            >
              {{ $route.params.id === '1' ? '注册' : '找回' }}
            </Button>
          </FormItem>
          <FormItem
            v-if="$route.params.id === '1'"
            class="login-register-frame"
          >
            <Button
              type="text"
              ghost
              to="/login"
            >
              登录账号
            </Button>
          </FormItem>
          <FormItem
            v-if="$route.params.id === '2'"
            class="login-register-frame"
          >
            <Button
              type="text"
              ghost
              to="/login"
            >
              登录账号
            </Button>
            <Button
              type="text"
              ghost
              to="/register/1"
            >
              注册账号
            </Button>
          </FormItem>
          <FormItem class="powered-by">
            Powered By Xia`Liu
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from '@/api/user';

export default {
    name: 'Register',
    data () {
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号码不能为空'));
                this.showCountdown = true;
            } else {
                if (!(/^1[3-9]\d{9}$/.test(value))) {
                    callback(new Error('手机号码格式错误'));
                    this.showCountdown = true;
                } else {
                    // 异步验证手机号是否被注册
                    axios.queryPhone(this.formValidate).then(res => {
                        if (res.data.success) {
                            if (this.timer === 60) {
                                this.showCountdown = false;
                            }
                            callback();
                        } else {
                            callback(new Error(res.data.message));
                        }
                    });
                }
            }
        };
        return {
            timer: 60,
            showCountdown: true,
            btn_loading: false,
            interval: null,
            formValidate: {
                phoneNumber: '',
                password: '',
                verificationCode: ''
            },
            ruleValidate: {
                phoneNumber: [
                    {validator: validatePhone, trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                verificationCode: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        /*
                 * 发送验证码
                 * */
        endVerification () {
            this.btn_loading = true;
            axios.sendSms(this.formValidate).then(res => {
                if (res.data.success) {
                    this.btn_loading = false;
                    this.$Message.success(res.data.message);
                    if (!this.interval) {  // 倒计时
                        this.showCountdown = true;
                        this.interval = setInterval(() => {
                            if (this.timer > 0) {
                                this.timer--;
                            } else {
                                this.showCountdown = false;
                                this.timer = 60;
                                clearInterval(this.interval);
                                this.interval = null;
                            }
                        }, 1000);
                    }
                } else {
                    this.$Message.error(res.data.message);
                    this.btn_loading = false;
                }
            }).catch(error => {
                console.log(error);
                this.btn_loading = false;
                this.$Message.error('异常错误!');
            });
        },
        /*
                 * 注册提交
                 * */
        registerSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.handleRegister(this.formValidate).then(res => {
                        if (res.data.success) {
                            this.$Message.success(res.data.message);
                            this.$router.push({
                                name: 'login'
                            });
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            });
        }
    }
};
</script>
<!--
*author::^_夏流_^
*describe:
*2018/12/27 10:22
-->
