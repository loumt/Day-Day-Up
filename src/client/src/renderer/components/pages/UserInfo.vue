<template>
    <div class="userInfo" :style="{width: styleWidth}">
        <img @click="personalInfo" :src="userInfo.icon" class="userImg" @contextmenu.prevent="logout"/>
        <div class="userRemarks">
            <div class="userName">{{userInfo.nickname}}</div>
            <div class="remark">{{userInfo.signature}}</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
      data(){
        return {}
      },
      computed: {
        ...mapGetters(['userInfo']),
        styleWidth: function () {
          return this.width ? this.width : '75%'
        }
      },
      methods: {
        personalInfo() {
          this.$store.dispatch('changeTransition', 'flip')

          console.log(localStorage.getItem('user_id'))
          if(localStorage.getItem('user_id')){
            this.$router.push('/personal')
            }else{
            this.$router.push('/login')
          }
        },
        logout(){
          this.$store.dispatch('logout')
          localStorage.removeItem('user_id')
          this.$router.push('/')
        }
      }
    }
</script>

<style>
    .userInfo {
        display: flex;
        align-items: center;
        height: 60px
    }

    .userImg {
        margin-left: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        -webkit-app-region: no-drag;
        box-shadow: 0px 3px 13px 3px rgba(0, 0, 0, 0.3);
        transition:all .4s;
        -moz-transition:all .4s;
        -webkit-transition:all .4s;
        -o-transition:all .4s;
    }

    .userImg:hover{
        transform:scale(1.2);
    }

    .userRemarks {
        width: 70%;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }

    .userName {
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        font-weight: 700;
    }

    .remark {
        font-size: 10px;
        color: #cecece;
    }
</style>