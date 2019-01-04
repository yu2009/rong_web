<style lang="less">
    @import "./login.less";
</style>
<template>
    <div class="login">
        <div class="login-con">
            <transition name="in-out-translate-fade" mode="in-out" tag="div">
                <!--登录-->
                <Card :bordered="false" v-if="moduleSwitch === 1" :key="moduleSwitch">
                    <div slot="title">
                        <img src="../../assets/images/logoT_03.png" alt="">
                        <h2>登录账号</h2>
                    </div>
                    <Form ref="loginForm" :model="formValidate" :rules="ruleValidate"
                          @keydown.enter.native="handleSubmit('loginForm')">
                        <FormItem prop="userName">
                            <Input size="large" v-model="formValidate.userName" placeholder="用户名或手机号">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-contact"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input size="large" type="password" v-model="formValidate.password" placeholder="密码">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-lock"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="loginSubmit('loginForm')" size="large" type="success" long>登录</Button>
                        </FormItem>
                        <FormItem class="login-register-frame">
                            <Button type="text" ghost @click="moduleSwitch = 2">注册账号</Button>
                            <Button type="text" ghost @click="moduleSwitch = 3">忘记密码？</Button>
                        </FormItem>
                        <FormItem class="powered-by">
                            Powered By Xia`Liu
                        </FormItem>
                    </Form>
                </Card>
                <!--注册-->
                <Card :bordered="false" v-if="moduleSwitch === 2" :key="moduleSwitch">
                    <div slot="title">
                        <img src="../../assets/images/logoT_03.png" alt="">
                        <h2>注册账号</h2>
                    </div>
                    <Form ref="loginForm" :model="formValidate" :rules="ruleValidate"
                          @keydown.enter.native="handleSubmit('loginForm')">
                        <FormItem prop="userName">
                            <Input size="large" :maxlength="11" clearable v-model="formValidate.userName"
                                   placeholder="手机号">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-contact"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="verificationCode">
                            <Input size="large" v-model="formValidate.verificationCode"
                                   @on-search="endVerification"
                                   placeholder="验证码">
                            <span slot="prepend">
                                <Icon :size="16" type="md-chatboxes"/>
                            </span>
                                <span slot="suffix">
                                    <Button type="primary"
                                            :disabled="formValidate.userName.length !== 11" @click="endVerification">发送验证码</Button>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input size="large" type="password" v-model="formValidate.password" placeholder="密码">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-lock"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="registerSubmit('loginForm')" size="large" type="success" long>注册</Button>
                        </FormItem>
                        <FormItem class="login-register-frame">
                            <Button type="text" ghost @click="moduleSwitch = 1">登录账号</Button>
                        </FormItem>
                        <FormItem class="powered-by">
                            Powered By Xia`Liu
                        </FormItem>
                    </Form>
                </Card>
                <!--忘记密码-->
                <Card :bordered="false" v-if="moduleSwitch === 3" :key="moduleSwitch">
                    <div slot="title">
                        <img src="../../assets/images/logoT_03.png" alt="">
                        <h2>找回密码</h2>
                    </div>
                    <Form ref="loginForm" :model="formValidate" :rules="ruleValidate"
                          @keydown.enter.native="handleSubmit('loginForm')">
                        <FormItem prop="userName">
                            <Input size="large" v-model="formValidate.userName" placeholder="手机号或邮箱">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-contact"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="verificationCode">
                            <Input size="large" v-model="formValidate.verificationCode" search enter-button="发送"
                                   @on-search="endVerification"
                                   placeholder="验证码">
                            <span slot="prepend">
                                <Icon :size="16" type="md-chatboxes"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input size="large" type="password" v-model="formValidate.password" placeholder="设置新密码">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-lock"/>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="registerSubmit('loginForm')" size="large" type="success" long>修改</Button>
                        </FormItem>
                        <FormItem class="login-register-frame">
                            <Button type="text" ghost @click="moduleSwitch = 1">登录账号</Button>
                            <Button type="text" ghost @click="moduleSwitch = 2">注册账号</Button>
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
                moduleSwitch: 2,
                formValidate: {
                    userName: '',
                    password: '',
                    verificationCode: ''
                },
                ruleValidate: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
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
                            console.log(res);
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
            },
            /*
            * 发送验证码
            * */
            endVerification () {
                axios.sendSms(this.formValidate).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                });
            },
            /*
            * 注册提交
            * */
            registerSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(valid);
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
