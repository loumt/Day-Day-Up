<template>
    <div class="header">
        <user-info-model></user-info-model>
        <div class="rightBox">
            <i @click="hideWindow" class="rightIcon iconfont icon-zuixiaohua"></i>
            <i @click="closeWindow" class="rightIconLast rightIcon iconfont icon-guanbi5"></i>
        </div>
    </div>
</template>

<script>
  import {remote} from 'electron'
  import userInfoModel from '@/components/pages/UserInfo.vue'

  export default {
    data() {
      return {}
    },
    components: {
      userInfoModel
    },
    methods: {
      closeWindow() {
        remote.app.quit()
      },
      hideWindow() {
        let win = remote.getCurrentWindow()
        if (win.isMinimized()) {
          win.restore()
        } else {
          win.minimize()
        }
      }
    }
  }
</script>

<style>
    .header {
        height: 60px;
        display: flex;
        padding: 2px;
    }

    .rightIcon {
        float: right;
        font-size: 18px;
        padding: 5px 0px 5px 4px;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }

    .rightIcon:hover {
        color: #ff001a;
    }

    .rightIconLast {
        padding-right: 5px;
    }

    .rightBox {
        width: 25%;
        display: flex;
        justify-content: flex-end;
    }

    .header {
        height: 60px;
        -webkit-app-region: drag;
    }

    .rightIcon {
        float: right;
        font-size: 18px;
        padding: 5px 0px 5px 4px;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }

    .rightIcon:hover {
        color: #ff001a;
    }

    .rightIconLast {
        padding-right: 5px;
    }
</style>