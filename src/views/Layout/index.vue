<template>
  <el-container class="container">
    <el-aside>
      <aside-menu />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-container class="content">
        <el-main>
          <slot />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from './AsideMenu'
export default {
  name: 'BaseLayout',

  mixins: [],

  components: {
    AsideMenu,
  },

  props: {
    header: String,
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    onClickLeft() {
      this._goBack()
    },
    onClickRight() {},
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.content {
  overflow: hidden;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: auto !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
