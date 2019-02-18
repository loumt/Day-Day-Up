<template>
    <div :style="backGroundParent" class="fullWindow">
        <header class="headDiv">
            <slot name="header"></slot>
        </header>
        <main class="bodyDiv">
            <slot>
                <transition :name="transitionGroup.transitionName" :mode="transitionGroup.mode">
                    <router-view :class="transitionGroup.routerClass"></router-view>
                </transition>
            </slot>
        </main>
        <footer class="footDiv">
            <slot name="footer"></slot>
        </footer>

        <transition name="animation">
            <animation-box></animation-box>
        </transition>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AnimationBox from '@/components/pages/AnimationBox.vue'

  export default {
    name: 'MainFrame',
    data() {
      return {}
    },
    components: {AnimationBox},
    computed: {
      ...mapGetters([
        'backGroundParent', 'transitionGroup'
      ])
    }
  }
</script>

<style scope>
    * {
        font-family: "Comic Sans MS";
    }

    .fullWindow {
        border-radius: 3px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.3);
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        border-radius: 8px;
        z-index: 99;
    }

    .bodyDiv {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        word-break: break-all;
        flex-grow: 1;
        position: relative;
        overflow-x: hidden;
    }

    .headDiv {
        flex-shrink: 0;
        -webkit-app-region: drag;
    }

    .footDiv {
        flex-shrink: 0;
    }
</style>