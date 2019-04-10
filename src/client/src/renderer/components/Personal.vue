<template>
    <div class="content-main">
        <div class="content-main-top">
            <div>
                <i class="iconfont icon-guanjiaowangtubiao01 content-main-logo"></i>
            </div>
            <div>
                <span class="content-main-tag">个人信息</span>
            </div>
        </div>

        <div class="content-main-from">
            <div>
                <label>NickName:</label>
                <span>{{fromData.nickname}}</span>
            </div>
            <div>
                <label>RealName:</label>
                <span>{{fromData.realname}}</span>
            </div>
            <div>
                <label>QQ:</label>
                <span>{{fromData.qq}}</span>
            </div>
            <div>
                <label>Email:</label>
                <span>{{fromData.email}}</span>
            </div>
            <div>
                <label>Phone:</label>
                <span>{{fromData.phone}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "Personal",
    data(){
      return {
        fromData: {
          nickname: '',
          realname:'',
          qq:'',
          email: '',
          phone: ''
        }
      }
    },
    mounted(){
      if(localStorage.getItem('user_id')){
        this.$http.userInfo({user_id: localStorage.getItem('user_id')}).then(res=>{
          Object.assign(this.fromData, res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {

    }
  }
</script>

<style scoped>
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
        margin-top: 10px;
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
    }

    .content-main-from > div {
        padding: 0px 20px;
        height: 25px;
        margin-top: 5px;
        align-items: center;
        text-align: center;
    }
    .content-main-from > div > label {
        font-size: 12px;
        font-weight: 900;
        width: 80px;
        float: left;
        margin-top: 7px;
    }

    .content-main-from > div > span {
        font-size: 12px;
        line-height: 20px;
        font-weight: normal;
        border: 2px solid #252638;
        border-radius: 3px;
        width: 150px;
        float: right;
    }
</style>