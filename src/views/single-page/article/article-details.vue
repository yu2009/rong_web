<style lang="less">
    @import "./article-details.less";
</style>
<template>
  <div class="article-details">
    <Card :dis-hover="true">
      <div slot="title">
        <h3 class="article-title">
          文章标题
        </h3>
        <span class="article-info">
          作者:2009 时间:2018-12-26 阅读:100,000
        </span>
      </div>
      <div>
        文章内容
      </div>
    </Card>
  </div>
</template>

<script>
export default {
    name: 'ArticleDetails'
};
</script>
<!--
*author::^_夏流_^
*describe:
*2018/12/26 14:51
-->
