<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <span v-bind:title="message">
      停留看信息1111
    </span>

  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        message: 'This is a Login Page.' + new Date().toLocaleString()
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
