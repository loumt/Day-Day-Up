<template>
    <div class="content-main">
        <div class="content-main-top">
            <div>
                <i class="iconfont icon-guanjiaowangtubiao01 content-main-logo"></i>
            </div>
            <div>
                <span class="content-main-tag">注 册</span>
            </div>
        </div>

        <div class="content-main-from">
            <div>
                <el-input v-model="fromData.nickname" placeholder="请输入昵称">
                    <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
                <el-input style="margin-top: 10px;" v-model="fromData.username" placeholder="请输入用户名">
                    <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
                <el-input style="margin-top: 10px;" v-model="fromData.password" placeholder="请输入密码!">
                    <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
            </div>
            <div style="margin-top: 10px;">
                <el-button style="width:100%;" @click="login">注册</el-button>
            </div>
        </div>
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