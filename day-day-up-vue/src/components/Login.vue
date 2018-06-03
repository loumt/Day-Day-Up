<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <a href="/role">11111</a>
    <span v-bind:title="message">
      停留看信息
    </span>

    <button type="button" name="getRoleList" @click="getRoleList()">获取角色列表</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        message: 'This is a Login Page.' + new Date().toLocaleString(),
        roleList: []
      }
    },
    methods: {
      getRoleList() {
        axios.get('/api/role/list').then((result) => {
          console.dir(result)
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
