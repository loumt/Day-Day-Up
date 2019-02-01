<template>
    <div class="content-main">
        <div class="content-main-top">
            <div>
                <i class="iconfont icon-guanjiaowangtubiao01 content-main-logo"></i>
            </div>
            <div>
                <span class="content-main-tag">注册</span>
            </div>
        </div>

        <div class="content-main-from">
            <div>
                <el-input v-model="fromData.nickname" placeholder="请输入昵称"></el-input>
                <el-input style="margin-top: 10px;" v-model="fromData.username" placeholder="请输入用户名"></el-input>
                <el-input style="margin-top: 10px;" v-model="fromData.password" placeholder="请输入密码!"></el-input>
            </div>
            <div style="margin-top: 10px;">
                <el-button style="width:100%;" @click="login">注册</el-button>
            </div>
        </div>

        <!--<div class="content-main-footer">-->
            <!--<p class="content-main-footer-remark">&#45;&#45;其他方式登录&#45;&#45;</p>-->
            <!--<div class="content-main-footer-icon">-->
                <!--<i class="iconfont icon-btn_qq"></i>-->
                <!--<i class="iconfont icon-btn_wechat"></i>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
  export default {
    name: "Register",
    data(){
      return {
        fromData: {
          nickname: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      register() {
        this.$http.register(this.fromData).then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>