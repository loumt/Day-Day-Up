<template>
    <div class="user-content">
        <div>
            <el-input placeholder="搜索" style="opacity: 0.6">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div>
            <!--Message List-->
            <div class="workspace-content" @click="open('message-list')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/message.png">
                </div>
                <div class="workspace-content-right">
                    <el-tag class="workspace-num" @click="open('message-unread-list')">{{this.discussMessage.unread}}</el-tag>
                    <el-tag class="workspace-num" @click="open('message-read-list')">{{this.discussMessage.read}}</el-tag>
                </div>
            </div>
            <div class="workspace-content" @click="open('praise-list')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/512602.png">
                </div>
                <div class="workspace-content-right">
                    <el-tag class="workspace-num workspace-unread"  @click="open('message-enshrine-list')">{{this.enshrine}}</el-tag>
                </div>
            </div>
            <div class="workspace-content" @click="open('broadcast-list')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/512795.png">
                </div>
                <div class="workspace-content-right">
                    <el-tag class="workspace-num workspace-unread" @click="open('sys-message-unread-list')">{{this.sysMessage.unread}}</el-tag>
                    <el-tag class="workspace-num workspace-read" @click="open('sys-message-read-list')">{{this.sysMessage.read}}</el-tag>
                </div>
            </div>
            <div class="workspace-content" @click="open('care-list')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/like.png">
                </div>
                <div class="workspace-content-right">
                    <el-tag class="workspace-num workspace-unread" @click="open('face-message-unread-list')">{{this.careMessage.unread}}</el-tag>
                    <el-tag class="workspace-num workspace-read" @click="open('face-message-read-list')">{{this.careMessage.read}}</el-tag>
                </div>
            </div>

            <!--Toolbar-->
            <!--<div class="user-toolbar">-->
                <!--<a>111</a>-->
                <!--<a>111</a>-->
                <!--<a>111</a>-->
                <!--<a>111</a>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MessageList',
    data() {
      return {
        discussMessage: {
          unread: 30,
          read: 444
        },
        enshrine: 500,
        sysMessage: {
          unread: 2,
          read: 43
        },
        careMessage: {
          unread: 3,
          read: 15
        }
      }
    },
    mounted(){
      this.$http.main().then(res=>{
        this.enshrine = res.data.praise
        this.discussMessage = res.data.discussMessage
        this.sysMessage = res.data.sysMessage
        this.careMessage = res.data.careMessage
      })
    },
    methods: {
      open: function(winType){
        console.log(`Open ${winType}`)
      }
    }
  }
</script>

<style>
    .user-content {
        height: 338px;
        width: 92%;
        margin-left: 4%
    }

    .user-toolbar {
        position: fixed;
        bottom: 38px;
    }

    .workspace-content{
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-radius: 3px;
        opacity: 0.9;
    }
    .workspace-icon{
        width: 50px;
        transition:all .2s;
        height: 50px;
    }
    .workspace-content:hover {
        background-color: rgba(249, 239, 249, 0.98);
    }
    .workspace-content:hover .workspace-icon{
        margin-left: 6px;
    }
    .workspace-content-left{
         float: left;
     }
    .workspace-content-right{
        float: right;
    }

    .workspace-num{
        margin-top: 15%;
        border-radius: 20px;
    }
    .workspace-read{

    }
    .workspace-unread{

    }
</style>