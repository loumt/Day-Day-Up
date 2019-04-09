<template>
    <div class="user-content">
        <div>
            <el-input placeholder="搜索" style="opacity: 0.6">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div>
            <!--Message List-->
            <div class="workspace-content" @click="open('workspace')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/message.png">
                </div>
                <div class="workspace-content-right">
                    <div class="workspace-num workspace-unread">{{this.message.unread}}</div>
                    <div class="workspace-num workspace-read">{{this.message.read}}</div>
                </div>
            </div>
            <div class="workspace-content" @click="open('workspace')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/512602.png">
                </div>
                <div class="workspace-content-right">
                    <div class="workspace-num workspace-unread">{{this.enshrine}}</div>
                </div>
            </div>
            <div class="workspace-content" @click="open('workspace')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/512795.png">
                </div>
                <div class="workspace-content-right">
                    <div class="workspace-num workspace-unread">{{this.sys_message.unread}}</div>
                    <div class="workspace-num workspace-read">{{this.sys_message.read}}</div>
                </div>
            </div>
            <div class="workspace-content" @click="open('workspace')">
                <div class="workspace-content-left">
                    <img class="workspace-icon" src="./../../../static/icon/like.png">
                </div>
                <div class="workspace-content-right">
                    <div class="workspace-num workspace-unread">{{this.face_message.unread}}</div>
                    <div class="workspace-num workspace-read">{{this.face_message.read}}</div>
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
        message: {
          unread: 30,
          read: 444
        },
        enshrine: 500,
        sys_message: {
          unread: 2,
          read: 43
        },
        face_message: {
          unread: 3,
          read: 15
        }
      }
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
        color: #e6051a;
    }
    .workspace-read{

    }
    .workspace-unread{

    }
</style>