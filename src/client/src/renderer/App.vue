<template>
    <div id="app">
        <transition :name="transitionGroup.transitionName" :mode="transitionGroup.mode" v-on:after-enter="afterEnter">
            <router-view :class="transitionGroup.routerClass"></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
  export default {
    name: 'client',
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters([
        'transitionGroup'
      ])
    },
    methods : {
      afterEnter : function(){
        this.$store.dispatch('changeTransition','none')
      }
    }
  }
</script>

<style>
    #app {
        height: 100%;
        width: 100%;
    }
</style>
