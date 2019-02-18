<template>
    <div class="user-content">
        <div>
            <el-input placeholder="搜索">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div style="margin-top: 10px;">
            <!--Message List-->
            <div>
                <Row>
                    <span>111</span>
                    <div>1111111</div>
                </Row>
            </div>

            <!--Toolbar-->
            <div class="user-toolbar">
                <a>111</a>
                <a>111</a>
                <a>111</a>
                <a>111</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MessageList',
    data() {
      return {}
    }
  }
</script>

<style>
    .user-content {
        height: 338px;
    }

    .user-toolbar {
        position: fixed;
        bottom: 38px;
    }
</style>