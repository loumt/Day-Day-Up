<template>
  <div>
    <div>
      <!--<img src=""/>-->
      <span>标题</span>
    </div>
    <Form :model="formData" class="login-form">
      <FormItem>
        <Input v-model="formData.username" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Input v-model="formData.password"  placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="loginSubmit" style="width: 100%">登录</Button>
        <Button type="primary" @click="register" style="width: 100%">注册</Button>
        <div>
          <a hre="#">忘记密码</a>
        </div>
      </FormItem>
    </Form>

  </div>
</template>
<script>
  import {mapGetters} from "vuex"

  export default {
    name: 'Login',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getLoginCount','getLoginErrorCount'
      ])
    },
    methods: {
      loginSubmit : function() {
        console.log('Login')
        this.$router.push('/home')
      },
      register: function(){
        console.log('register')
      }
    }
  }
</script>
<style lang="stylus">
  .login-form
    input {
      width 200px
    }
</style>
