<template>
    <main-frame>
        <header-model slot="header"></header-model>
        <footer-model slot="footer"></footer-model>
    </main-frame>
</template>
<script>
  import MainFrame from '@/components/MainFrame.vue'
  import HeaderModel from '@/components/pages/Header.vue'
  import FooterModel from '@/components/pages/Footer.vue'

  export default {
    name: 'MainWindow',
    components: {MainFrame, HeaderModel, FooterModel}
  }
</script>