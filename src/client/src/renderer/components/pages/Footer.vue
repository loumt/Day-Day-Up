<template>
    <div class="footer-class">
        <span><i class="iconfont icon-previous-copy icon-style-left" @click="goBack" v-show="this.$route.path != '/login'"></i></span>
        <span></span>
        <i class="iconfont icon-shezhi2 icon-style setting-icon" @click="setting"></i>
    </div>
</template>
<script>
  export default {
    name: 'MainFooter',
    methods: {
      setting () {

      },
      goBack () {
        this.$store.dispatch('changeTransition', 'slipRight')
        this.$router.push('/')
      }
    }
  }
</script>
<style>
    .footer-class{
        display: flex;
        font-size: 12px;
        height: 30px;
        justify-content: space-between;
        align-items: center;
    }
    .icon-style{
        font-size: 20px;
        margin-right: 10px;
    }
    .icon-style-left{
        font-size: 20px;
        margin-left: 10px;
    }

    .setting-icon{
        cursor: pointer;
    }
</style>