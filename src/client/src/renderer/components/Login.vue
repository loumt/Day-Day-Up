<template>
    <div class="content-main">
        <div class="content-main-top">
            <div>
                <i class="iconfont icon-guanjiaowangtubiao01 content-main-logo"></i>
            </div>
            <div>
                <span class="content-main-tag">登录</span>
            </div>
        </div>

        <div class="content-main-from">
            <div>
                <el-input v-model="fromData.username" placeholder="请输入用户名"></el-input>
                <el-input style="margin-top: 10px;" v-model="fromData.password" placeholder="请输入密码!"></el-input>
            </div>
            <div style="margin-top: 10px;">
                <el-button style="width:47%;" @click="login">登录</el-button>
                <el-button style="width:47%;" @click="register">注册</el-button>
            </div>
        </div>

        <div class="content-main-footer">
            <p class="content-main-footer-remark">--其他方式登录--</p>
            <div class="content-main-footer-icon">
                <i class="iconfont icon-btn_qq" @click="loginForQQ"></i>
                <i class="iconfont icon-btn_wechat" @click="loginForWechat"></i>
            </div>
        </div>
    </div>
</template>

<script>
  import {remote} from 'electron'
  import {mapGetters} from 'vuex'
  import HeaderModel from '@/components/pages/Header.vue'
  import MainFrame from '@/components/MainFrame.vue'

  export default {
    name: "Login",
    data(){
      return {
        fromData: {
          username:'admin',
          password:'123456'
        }
      }
    },
    mounted(){
    },
    computed: {
      styleWidth: function () {
        return this.width ? this.width : '75%'
      },
      ...mapGetters(['backGroundParent'])
    },
    components: {
      MainFrame,
      HeaderModel
    },
    methods: {
      register() {
        this.$store.dispatch('changeTransition', 'slipRight')
        this.$router.push('/register')
      },
      login() {
        this.$http.login(this.fromData).then(res =>{
          this.$store.dispatch('changeUserInfo',res.data.data)

          localStorage.setItem('user_id', res.data.data.id)
        }).catch(err=>{
          console.log(err)
        })
      },
      loginForQQ(){

      },
      loginForWechat(){

      }
    },
  }
</script>

<style>
    .content-main {
        width:100%;
        height:338px;
        overflow-y: auto;
        word-break: break-all;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .content-main >  div {
        width: 100%;
    }

    .content-main-top{
        margin-top: 20px;
        text-align: center;
        align-items: center;
    }

    .content-main-logo{
        font-size: 30px;
    }

    .content-main-tag{
        text-align: center;
        font-size: 12px;
        font-weight: 900;
        line-height: 30px;
    }

    .content-main-from{
        margin-top: 20px;
        width: 80%;
    }

    .content-main-from > div{
        padding: 0px 20px;
    }

    .content-main-footer{
        position:fixed;
        bottom:30px;
    }

    .content-main-footer-remark{
        text-align: center;
        font-size: 12px;
        font-family: "Comic Sans MS";
    }
    .content-main-footer-icon{
        text-align: center;
    }

    .content-main-footer-icon > i{
        font-size: 20px;
        margin: 0 5px;
        cursor: pointer;
    }
</style>