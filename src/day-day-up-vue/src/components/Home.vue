<template>
  <div class="layout">
    <div style="height: 255px;padding: 10px 50px 50px 20px;background-color: #FFFFFF;">
      <div style="float: inherit;border: 2px solid #FFFFFF">
        <div  style="float: left; margin-left: 100px;">
          <ul>
            <li style="display: inline;"><a>Home</a></li>
            <li style="display: inline; margin-left: 10px"><a>Article</a></li>
            <li style="display: inline; margin-left: 10px"><a>Article</a></li>
            <li style="display: inline; margin-left: 10px"><a>Article</a></li>
          </ul>
        </div>
        <div style="float: right; margin-right: 100px;">
          <ul>
            <li style="display: inline;  margin-right: 10px"><a>Admin</a></li>
            <li style="display: inline;  margin-right: 10px"><a>Admin</a></li>
            <li style="display: inline;  margin-right: 10px"><a>Admin</a></li>
            <li style="display: inline;  margin-right: 10px">111</li>
            <li style="display: inline;"><a>Admin</a></li>
          </ul>
        </div>
      </div>
    </div>
    <Row class="layout-ceiling">
      <i-col span="4" class="layout-ceiling-title">标题</i-col>
      <i-col span="4" style="float: right">
        <a href="#">注册登录</a> |
        <a href="#">帮助中心</a> |
        <a href="#">安全中心</a> |
        <a href="#">服务大厅</a>
      </i-col>
    </Row>

    <div :style="{height: computeHeight + 'px'}" class="content-item">
      <div class="article-item">
        1233
      </div>
      <div class="category-item">
        12313
      </div>
    </div>
    <div class="layout-copy">
      2011-2016 &copy; TalkingData
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data() {
      return {
        searchContent: "12313"
      }
    },
    computed: {
      computeHeight: function(){
        return document.documentElement.clientHeight
      }
    },
    methods: {
      search: function(){
        console.log(this.searchContent)
      }
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-ceiling {
    width:100%;
    background: #464c5b;
    padding: 10px 0;
    position: fixed;
    overflow: hidden;
  }


  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-ceiling-title {
    float: left;
    margin-left: 10px;
    color: #9ba7b5;
  }

  .content-item{
    padding: 5rem 10% 0rem 10%;
  }

  .category-item{
    float: right;
    width: 25%;
    border:1px solid #000000;
  }

  .article-item{
    float: left;
    width: 70%;
    border:1px solid #000000;
  }
</style>
