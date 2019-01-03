<style lang="less">
    @import "./login.less";
</style>
<template>
    <div class="login">
        <div class="login-con">
            <!--<div class="logo">-->
            <!--<a href="">-->
            <!--<img src="../../assets/images/logo_2.png" alt="">-->
            <!--</a>-->
            <!--</div>-->
            <Card title="欢迎登录" :bordered="false">
                <Form ref="loginForm" :model="formValidate" :rules="ruleValidate"
                      @keydown.enter.native="handleSubmit('loginForm')">
                    <FormItem prop="userName">
                        <Input v-model="formValidate.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-contact"/>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-lock"/>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="handleSubmit('loginForm')" type="primary" long>登录</Button>
                    </FormItem>
                </Form>
            </Card>
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
            formValidate: {
                userName: '',
                password: ''
            },
            ruleValidate: {
                userName: [
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
        handleSubmit (name) {
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
        }
    }
};
</script>
<!--
*author::^_夏流_^
*describe: 登录
*2018/12/20 14:46
-->
