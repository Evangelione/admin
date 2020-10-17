<template>
  <div>
    <el-button @click="isCollapse = !isCollapse" size="small">切换</el-button>
    <el-menu :collapse="isCollapse" @close="handleClose" @open="handleOpen" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/merchant/list">商户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      isCollapse: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.$router.replace({ path: key }, e => e)
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}

.el-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>
