<style lang="less">
    @import "./article-manager.less";
</style>

<template>
    <div class="article-manager">
        <Table :columns="columns1" :data="listData"></Table>
    </div>
</template>

<script>
    export default {
        name: 'articleManager',
        data () {
            return {
                columns1: [
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '文章标题',
                        key: 'title'
                    },
                    {
                        title: '发布时间',
                        key: 'releaseTime'
                    },
                    {
                        title: '阅读量',
                        key: 'readingVolume',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'Action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [{
                    title: '文章001',
                    releaseTime: '2018-12-16',
                    readingVolume: '1000002'
                }]
            };
        },
        methods: {
            /*
            * 查看详情
            * */
            show (index) {
                this.$Modal.info({
                    title: `${this.listData[index].title}`,
                    content: `文章标题：${this.listData[index].title}<br>发布时间：${this.listData[index].releaseTime}<br>阅读量：${this.listData[index].readingVolume}`
                });
            },
            /*
            * 删除列表
            * */
            remove (index) {
                this.listData.splice(index, 1);
            }
        }
    };
</script>
<!--
*author::^_夏流_^
*describe:
*2018/12/26 15:09
-->
