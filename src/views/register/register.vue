<style lang="less">
    @import "./register.less";
</style>
<template>
    <div class="register">
        <div class="register-con">
            <!--<div class="logo">-->
            <!--<a href="">-->
            <!--<img src="../../assets/images/logo_2.png" alt="">-->
            <!--</a>-->
            <!--</div>-->
            <Card title="欢迎注册" :bordered="false">
                <Form ref="registerForm" :model="formValidate" :rules="ruleValidate"
                      @keydown.enter.native="handleSubmit">
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
                        <Button @click="handleSubmit('registerForm')" type="primary" long>注册</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
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
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post('http://localhost:3000/api/register', {
                        userName: this.formValidate.userName,
                        password: this.formValidate.password
                    }).then((res) => {
                        if (res.data.success) {
                            this.$Message.success(res.data.message);
                            setTimeout(() => {
                                this.$router.push('login');
                            }, 2000);
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
*describe:
*2018/12/27 10:22
-->
