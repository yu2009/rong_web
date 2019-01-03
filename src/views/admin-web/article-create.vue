<style lang="less">
    @import "./article-create.less";
</style>

<template>
    <div class="article-create">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="文章标题" prop="title">
                <Input v-model="formValidate.title" placeholder="输入文章标题..."></Input>
            </FormItem>
            <FormItem label="文章作者">
                <Input v-model="formValidate.author" placeholder="输入文章作者"></Input>
            </FormItem>
            <FormItem label="开启评论">
                <RadioGroup v-model="formValidate.comment">
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="文章内容" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="输入文章内容..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">提交</Button>
                <Button to="/admin/article-manager">返回</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            formValidate: {
                title: '',
                author: '',
                comment: '1',
                content: ''
            },
            ruleValidate: {
                title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
                content: [{required: true, message: '文章内容不能为空', trigger: 'blur'},
                    {type: 'string', min: 20, message: '文章内容不能少于20个字符', trigger: 'blur'}]
            }
        };
    }
};
</script>
<!--
*author::^_夏流_^
*describe:
*2018/12/26 16:11
-->
