<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
}

.el-cascader-menu {
  max-height: 300px;
}

.success {
  color: #67c23a;
}

.danger {
  color: #f56c6c;
}
</style>
